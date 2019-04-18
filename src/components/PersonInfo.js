import React from 'react';
import CardList from './CardList';

const PersonInfo = ({onRouteChange,courses,results}) =>{
	return(
		<div>
			<main 
				className="pa2"
				style = {{display: 'flex', justifyContent: 'center'}}
			>
			
			        <input 
			        	className = 'pa3 ba b--green bg-lightest-blue input-reset w-30'
			        	/*className="pa2  ba bg-transparent hover-bg-light-green hover-black " */
			        	type="text" 
			        	name="enrollcourse"  
			        	id="enrollcourse"
			        	placeholder='Please input (courseid,rating);'
			        />
			        <small id="name-desc" class="f6 black-60 db mb2"></small>
			      
			      <input 
			      	onClick ={()=>onRouteChange('home')}
			      	className="b ph1 pv1 input-reset ba bg-transparent grow pointer f6 dib" 
			      	type="submit" 
			      	value="Confirm"
			      />&nbsp;&nbsp;&nbsp;&nbsp;
			      <p 
			      	onClick ={()=>onRouteChange('home')} 
			      	className="dim pa3 pointer">Skip
			      </p>
			    
			  
			</main>	
			<h2>Enrolled Course History</h2>
			<CardList courses={courses}/><br />
			<h2>Recommendation for you</h2>
			<CardList courses={results}/>
		 </div>
	);
}

export default PersonInfo;

/*
  <div className="measure center"> 
			    <fieldset id="regist_er" className="ba b--transparent ph0 mh0">
			      <div className="mt3"> </div>
			    </fieldset></div>
*/