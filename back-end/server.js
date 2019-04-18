/*
/signin -- > POST = success/fail
/register --> POST =user
/profile/ : userId --> GET = user
*/

const express = require ('express');
const bodyParser = require('body-parser');
const cors = require ('cors');
const knex = require ('knex');

const db = knex ({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'apple',
    password : '',
    database : 'courserecom'
  }
});

const app = express();


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) =>{
	res.send(database.users);
})

app.post('/signin', (req, res) =>{
	db.select('email','password').from('users')
	  .where('email', '=', req.body.email)
	  .then(data => {
	  	if(req.body.password === data[0].password){
	  		return db.select('*').from('users')
		  		  	 .where('email','=',req.body.email)
		  		     .then(user =>{
		  		  	    res.json(user[0])
		  		     })
		  		     .catch(err => res.status(400).json('unable to get user'))
		}else{
			res.status(400).json('wrong credentials')
		}	
	  })
	  .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req, res) =>{
	const {email, name, password} = req.body;
	db('users')
		.returning('*')
		.insert({
		name: name,
		email: email,
		password: password
		})
		.then(user => {
		res.json(user[0]);
		})
		.catch(err => res.status(400).json('unable to register'))
})

app.get('/profile/:userid', (req,res)=>{
	const {userid} = req.params;
	db.select('*').from('users').where({userid})
		.then(user => {
			if(user.length){
				res.json(user[0])
			}else{
				res.status(400).json('Not Found')
			}
		})
		.catch( err => res.status(400).json('error getting user'))
})



app.listen(3000, () => {
	console.log('app is running on port 3000');
})

