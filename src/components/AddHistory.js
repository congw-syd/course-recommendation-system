import React from 'react';

class AddHistory extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			studentid: '',
			courseid: '',
			rating: ''
		}
	}
	
	onIdChange =(event) =>{
		this.setState({studentid: event.target.value})
	}

	onCourseChange =(event) =>{
		this.setState({courseid: event.target.value})
	}

	onRatingChange =(event) =>{
		this.setState({rating: event.target.value})
	}

	onConfirmChange =() =>{
			fetch('http://localhost:3000/addhistory', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					studentid: this.state.studentid,
					courseid: this.state.courseid,
					rating: this.state.rating
				})
			})
				.then(response => response.json())
				.then(item => {
					if(item){
						this.props.onRouteChange('personinfo');
					}
				})	
		}
	render(){
		return(
			<div>
				<article className="br3 ba dark-gray b--black-10 mv4 mw6 shadow-5 center">
						<main className="pa4 black-80">
						  <div className="measure">
						    <fieldset id="regist_er" className="ba b--transparent ph0 mh0">
						      <div className="mt3">
						        <label className="db fw6 lh-copy f6" htmlFor="userid">StudentId</label>
						        <input 
						        	className="pa2 input-reset ba bg-transparent hover-bg-light-green hover-black w-100" 
						        	type="text" 
						        	name="userid"  
						        	id="userid"
						        	onChange={this.onIdChange}
						        />
						      </div>
						      <div className="mt3">
						        <label className="db fw6 lh-copy f6" htmlFor="courseid">Courseid</label>
						        <input 
						        	className="pa2 input-reset ba bg-transparent hover-bg-light-green hover-black w-100" 
						        	type="text" 
						        	name="courseid"  
						        	id="courseid"
						        	onChange={this.onCourseChange}
						        />
						      </div>
						      <div className="mv3">
						        <label className="db fw6 lh-copy f6" htmlFor="rating">Rating</label>
						        <input 
						        	className="b pa2 input-reset ba bg-transparent hover-bg-light-green hover-black w-100" 
						        	type="text" 
						        	name="rating"  
						        	id="rating"
						        	onChange={this.onRatingChange}
						        />
						      </div>
						    </fieldset>
						    <div>
						      <input 
						      	onClick ={this.onConfirmChange}
						      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
						      	type="submit" 
						      	value="Confirm"/>
						    </div>
						    
						  </div>
						</main>
					</article>
			</div>
		);
	}
}

export default AddHistory;