#!/usr/bin/env python
# coding: utf-8

# In[5]:


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
from sklearn import preprocessing
from lightfm import LightFM
from scipy.sparse import csr_matrix 
from scipy.sparse import coo_matrix 
from sklearn.metrics import roc_auc_score
import time
from lightfm.evaluation import auc_score
import pickle
import re
import seaborn as sns


# In[30]:


courses = pd.read_csv('course.csv',encoding='gbk')
#courses.columns = ['courseid', 'name', 'description', 'prerequisites','term']
users = pd.read_csv('user.csv')
#users.columns = ['userid', 'password', 'fullname']
ratings = pd.read_csv('rating.csv')
#ratings.columns = ['userid', 'courseid', 'rating']


# In[14]:


#courses.shape
#users.shape
#ratings.shape


# In[31]:


#courses.head()
#users.head()
#ratings.head()
ratings_explicit = ratings[ratings.courseid.isin(courses.courseid)]
ratings_explicit.shape


# In[32]:


sns.countplot(data=ratings_explicit , x='rating')
plt.show()


# In[33]:


def informed_train_test(rating_df, train_ratio):
    split_cut = np.int(np.round(rating_df.shape[0] * train_ratio))
    train_df = rating_df.iloc[0:split_cut]
    test_df = rating_df.iloc[split_cut::]
    test_df = test_df[(test_df['userid'].isin(train_df['userid'])) & (test_df['courseid'].isin(train_df['courseid']))]
    id_cols = ['userid', 'courseid']
    trans_cat_train = dict()
    trans_cat_test = dict()
    for k in id_cols:
        cate_enc = preprocessing.LabelEncoder()
        trans_cat_train[k] = cate_enc.fit_transform(train_df[k].values)
        trans_cat_test[k] = cate_enc.transform(test_df[k].values)

    # --- Encode ratings:
    cate_enc = preprocessing.LabelEncoder()
    ratings = dict()
    ratings['train'] = cate_enc.fit_transform(train_df.rating)
    ratings['test'] = cate_enc.transform(test_df.rating)

    n_users = len(np.unique(trans_cat_train['userid']))
    n_items = len(np.unique(trans_cat_train['courseid']))


    train = coo_matrix((ratings['train'], (trans_cat_train['userid'],                                                           trans_cat_train['courseid']))                                       , shape=(n_users, n_items))
    test = coo_matrix((ratings['test'], (trans_cat_test['userid'],                                                         trans_cat_test['courseid']))                                      , shape=(n_users, n_items))
    return train, test, train_df


# In[34]:


train, test, raw_train_df = informed_train_test(ratings, .8)


# Now let's train a BPR model and look at its accuracy.
# We'll use two metrics of accuracy: precision@k and ROC AUC. Both are ranking metrics: to compute them, we'll be constructing recommendation lists for all of our users, and checking the ranking of known positive movies. For precision at k we'll be looking at whether they are within the first k results on the list; for AUC, we'll be calculating the probability that any known positive is higher on the list than a random negative example.

# In[67]:


start_time = time.time()
model=LightFM(no_components=115,learning_rate=0.027,loss='warp')
model.fit(train,epochs=12,num_threads=4)
# with open('saved_model','wb') as f:
#     saved_model={'model':model}
#     pickle.dump(saved_model, f)
auc_train = auc_score(model, train).mean()
auc_test = auc_score(model, test).mean()
print('AUC: train %.2f, test %.2f.' % (train_auc, test_auc))

from lightfm.evaluation import precision_at_k
train_precision = precision_at_k(model, train, k=10).mean()
test_precision = precision_at_k(model, test, k=10, train_interactions=train).mean()
print('Precision: train %.2f, test %.2f.' % (train_precision, test_precision))


# The WARP model, on the other hand, optimises for precision@k---we should expect its performance to be better on precision.

# In[68]:


model = LightFM(learning_rate=0.05, loss='bpr')
model.fit(train, epochs=10)

train_precision = precision_at_k(model, train, k=10).mean()
test_precision = precision_at_k(model, test, k=10, train_interactions=train).mean()

train_auc = auc_score(model, train).mean()
test_auc = auc_score(model, test, train_interactions=train).mean()

print('Precision: train %.2f, test %.2f.' % (train_precision, test_precision))
print('AUC: train %.2f, test %.2f.' % (train_auc, test_auc))


# In[36]:


user_item_matrix = raw_train_df.pivot(index='userid', columns='courseid', values='rating')
user_item_matrix.fillna(0, inplace = True)
user_item_matrix = user_item_matrix.astype(np.int32)
print(user_item_matrix.shape)
user_item_matrix.head()


# In[57]:


def user_item_dikts(interaction_matrix, items_df):
    user_ids = list(interaction_matrix.index)
    user_dikt = {}
    counter = 0 
    for i in user_ids:
        user_dikt[i] = counter
        counter += 1

    item_dikt ={}
    for i in range(items_df.shape[0]):
        item_dikt[(items_df.loc[i,'courseid'])] = items_df.loc[i,'courseid']
    
    return user_dikt, item_dikt


# In[58]:


def similar_recommendation(model, interaction_matrix, user_id, user_dikt, 
                               item_dikt,threshold = 0,number_rec_items = 15):

    #Function to produce user recommendations

    n_users, n_items = interaction_matrix.shape
    user_x = user_dikt[user_id]
    scores = pd.Series(model.predict(user_x,np.arange(n_items)))
    scores.index = interaction_matrix.columns
    scores = list(pd.Series(scores.sort_values(ascending=False).index))
    
    known_items = list(pd.Series(interaction_matrix.loc[user_id,:][interaction_matrix.loc[user_id,:] > threshold].index).sort_values(ascending=False))
    
    scores = [x for x in scores if x not in known_items]
    score_list = scores[0:number_rec_items]
    known_items = list(pd.Series(known_items).apply(lambda x: item_dikt[x]))
    scores = list(pd.Series(score_list).apply(lambda x: item_dikt[x]))

    print("Items that were liked by the User:")
    counter = 1
    for i in known_items[:25]:
        print(str(counter) + '- ' + i)
        counter+=1

    print("\n Recommended Items:")
    counter = 1
    for i in scores:
        print(str(counter) + '- ' + i)
        counter+=1
#     return score_list


# In[59]:


def users_for_item(model,interaction_matrix,courseid,number_of_user):
  
    #Funnction to produce a list of top N interested users for a given item

    n_users, n_items = interaction_matrix.shape
    x = np.array(interaction_matrix.columns)
    scores = pd.Series(model.predict(np.arange(n_users), np.repeat(x.searchsorted(courseid),n_users)))
    user_list = list(interaction_matrix.index[scores.sort_values(ascending=False).head(number_of_user).index])
    return user_list


# In[60]:


from sklearn.metrics.pairwise import cosine_similarity

def item_emdedding_distance_matrix(model,interaction_matrix):

#     Function to create item-item distance embedding matrix

    df_item_norm_sparse = csr_matrix(model.item_embeddings)
    similarities = cosine_similarity(df_item_norm_sparse)
    item_emdedding_distance_matrix = pd.DataFrame(similarities)
    item_emdedding_distance_matrix.columns = interaction_matrix.columns
    item_emdedding_distance_matrix.index = interaction_matrix.columns
    return item_emdedding_distance_matrix

def also_enrolled_recommendation(item_emdedding_distance_matrix, item_id, 
                             item_dikt, n_items = 4):

#     Function to create item-item recommendation

    recommended_items = list(pd.Series(item_emdedding_distance_matrix.loc[item_id,:].                                   sort_values(ascending = False).head(n_items+1).                                   index[1:n_items+1]))
    
    print("Item of interest :{}".format(item_dikt[item_id]))
    print("Items that are frequently enrolled together:")
    counter = 1
    for i in recommended_items:
        print(str(counter) + '- ' +  item_dikt[i])
        counter+=1
    return recommended_items


# In[61]:


user_dikt, item_dikt = user_item_dikts(user_item_matrix, courses)


# In[62]:


similar_recommendation(model, user_item_matrix, 5190114, user_dikt, item_dikt,threshold = 7)


# In[63]:


item_embedings = item_emdedding_distance_matrix(model,user_item_matrix)
also_enrolled_recommendation(item_embedings,'BINF6111' ,item_dikt)


# In[ ]:




