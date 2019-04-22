import React, {Component} from 'react';
import CardList from '../components/CardList';
import {courses} from '../data/courses';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import Navigation from '../components/Navigation';
import Signin from '../components/Signin';
import Particles from 'react-particles-js';
import Register from '../components/Register';
import PersonInfo from '../components/PersonInfo';
import Detail from '../components/Detail';
import AddHistory from '../components/AddHistory';
import './App.css';

const particlesOptions = {
	particles: {
    	number:{
    		value: 60,
    		density:{
    			enable: true,
    			value_area: 700
    		}
    	}	
    }
}

class App extends Component {
	constructor(){
		super()
		this.state={
			courses: [],
			enrolhistory:[],
			searchfiled: '',
			route: 'signin',
			user: {
				studentid: '',
				name: '',
				email: ''
			},
			history: {
				studentid: '',
				courseid: '',
				rating: ''
			}
		}
	}

	loadUser = (data) => {
		this.setState({user: {
			studentid: data.studentid,
			name: data.name,
			email: data.email
		}})
	}

	loadHistory = (data) => {
		this.setState({history: {
			student: data.studentid,
			courseid: data.courseid,
			rating: data.rating
		}})
	}

	componentDidMount(){
		/*this.setState({courses: courses});*/
		var that = this;
		fetch('http://localhost:3000/')
		.then(response => response.json())
		.then(function(data){
			that.setState({courses:data})
		});
		fetch('http://localhost:3000/gethistory')
		.then(response => response.json())
		.then(function(data){
			that.setState({enrolhistory:data})
		});

	}

	onSearchChange = (event) => {
		this.setState({searchfiled: event.target.value })
	}

	onRouteChange = (route) =>{
		this.setState ({route: route});
	}

	render(){
		const { enrolhistory, courses, searchfiled, route } = this.state;
		const filterCourse = courses.filter(item =>{
			return item.name.toLowerCase().includes(searchfiled.toLowerCase());
		});

		return(
				<div className = 'tc'>
					<Particles className ='particles' params ={particlesOptions} />
					{ route === 'home' ?
						<div>
							<div id="nav">
								<SearchBox searchChange = {this.onSearchChange}/>
								<Navigation onRouteChange={this.onRouteChange}/>
							</div>
							<CardList onRouteChange={this.onRouteChange} courses={filterCourse}/>
						</div>
						: 
						route === 'signin' ?
						(	<div>
								<h1 className = 'f1'>Course Recommender</h1>
							 	<Signin loadUser={this.loadUser} loadHistory={this.loadHistory} onRouteChange={this.onRouteChange}/> 
						 	</div>
						)
						: route === 'register' ?
						 	<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
							: route === 'personinfo' ?
								/*<PersonInfo courses={courseHistory} results={recomms} onRouteChange={this.onRouteChange}/>*/
								<PersonInfo sid={this.state.user.studentid} history={enrolhistory} onRouteChange={this.onRouteChange}/>
								: route === 'addhistory' ?
									 <AddHistory loadHistory={this.loadHistory} onRouteChange={this.onRouteChange}/>
									: <Detail onRouteChange={this.onRouteChange}/>		
					}
				</div>
		);
	}
}	

export default App;
