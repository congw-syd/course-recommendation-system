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
			searchfiled: '',
			route: 'signin',
			user: {
				id: '',
				name: '',
				email: ''
			}
		}
	}

	loadUser = (data) => {
		this.setState({data: {
			id: data.id,
			name: data.name,
			email: data.email
		}})
	}

	componentDidMount(){
		this.setState({courses: courses});
	}

	onSearchChange = (event) => {
		this.setState({searchfiled: event.target.value })
	}

	onRouteChange = (route) =>{
		this.setState ({route: route});
	}

	render(){
		const { courses, searchfiled, route } = this.state;
		const filterCourse = courses.filter(item =>{
			return item.name.toLowerCase().includes(searchfiled.toLowerCase());
		})

		const courseHistory = courses.filter(item =>{
			return item.name.toLowerCase().includes('web');
		})

		const recomms = courses.filter(item =>{
			return item.name.toLowerCase().includes('data');
		})

		return !courses.length ?
			<h1>Loading</h1> :
			(
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
					: (
						route === 'signin' ?
						(	<div>
								<h1 className = 'f1'>Course Recommender</h1>
							 	<Signin onRouteChange={this.onRouteChange}/> 
						 	</div>
						)
						: route === 'personinfo' ?
							<PersonInfo courses={courseHistory} results={recomms} onRouteChange={this.onRouteChange}/>
							: route === 'detail' ?
								<Detail onRouteChange={this.onRouteChange}/>
								: <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
					)		
				}
				</div>
			);
	}
}
		
	
	

export default App;
