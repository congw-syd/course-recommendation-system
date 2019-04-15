import React, {Component} from 'react';
import CardList from '../components/CardList';
import {courses} from '../data/courses';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import './App.css';

class App extends Component {
	constructor(){
		super()
		this.state={
			courses: [],
			searchfiled: ''
		}
	}

	componentDidMount(){
		this.setState({courses: courses});
	}

	onSearchChange = (event) => {
		this.setState({searchfiled: event.target.value })
	}

	render(){
		const { courses, searchfiled } = this.state;
		const filterCourse = courses.filter(item =>{
			return item.name.toLowerCase().includes(searchfiled.toLowerCase());
		})

		return !courses.length ?
			<h1>Loading</h1> :
			(
				<div className = 'tc'>
					<h1 className = 'f1'>Course Recommender</h1>
					<SearchBox searchChange = {this.onSearchChange}/>
					<Scroll>
						<CardList courses={filterCourse}/>
					</Scroll>
				</div>
			);
	}
}
		
	
	

export default App;
