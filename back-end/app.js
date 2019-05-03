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
	db.select('*').from('courses')
	.then(item => {
			if(item.length){
				res.json(item)
			}else{
				res.status(400).json('Not Found')
			}
	})
	.catch( err => res.status(400).json('error getting courses'))
})

app.post('/signin', (req, res) =>{
	db.select('studentid','password').from('students')
	  .where('studentid','=', req.body.studentid)
	  .then(data => {
	  	if(req.body.password === data[0].password){
	  		return db.select('*').from('students')
		  		  	 .where('studentid','=', req.body.studentid)
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
	const {studentid, email, name, password} = req.body;
	db('students')
		.returning('*')
		.insert({
		studentid: studentid,
		name: name,
		email: email,
		password: password
		})
		.then(user => {
		res.json(user[0]);
		})
		.catch(err => res.status(400).json('unable to register'))
})

app.post('/addhistory', (req, res) =>{
	const {studentid, courseid, rating} = req.body;
	db('enrolhistory')
		.returning('*')
		.insert({
		studentid: studentid,
		courseid: courseid,
		rating: rating
		})
		.then(record => {
		res.json(record[0]);
		})
		.catch(err => res.status(400).json('unable to add history'))
})

app.get('/gethistory', (req,res)=>{
	db.select('*').from('enrolhistory')
	.then(item => {
			if(item.length){
				res.json(item)
			}else{
				res.status(400).json('Not Found')
			}
	})
	.catch( err => res.status(400).json('error getting history'))
})

app.get('/getrecombystu', (req,res)=>{
	db.select('*').from('recombystu')
	.then(item => {
			if(item.length){
				res.json(item)
			}else{
				res.status(400).json('Not Found')
			}
	})
	.catch( err => res.status(400).json('error getting recommendation'))
})

app.get('/getrecombycou', (req,res)=>{
	db.select('*').from('recombycou')
	.then(item => {
			if(item.length){
				res.json(item)
			}else{
				res.status(400).json('Not Found')
			}
	})
	.catch( err => res.status(400).json('error getting history'))
})

module.exports = app ;