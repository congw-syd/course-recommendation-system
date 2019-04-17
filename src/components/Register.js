import React from 'react';

class Register extends React.Component {

	constructor(props){
		super(props);
		this.state ={
			Email: '',
			Password: '',
			name: ''
		}
	}
	
	onNameChange =(event) =>{
		this.setState({name: event.target.value})
	}

	onEmailChange =(event) =>{
		this.setState({email: event.target.value})
	}

	onPasswordChange =(event) =>{
		this.setState({password: event.target.value})
	}

	onSubmitSignin =() =>{
			fetch('http://localhost:3000/register', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password,
					name: this.state.name
				})
			})
				.then(response => response.json())
				.then(user => {
					if(user){
						this.props.loadUser(user)
						this.props.onRouteChange('home');
					}
				})	
		}

	render(){
		return(
		<article className="br3 ba dark-gray b--black-10 mv4 mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="regist_er" className="ba b--transparent ph0 mh0">
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input 
			        	className="pa2 input-reset ba bg-transparent hover-bg-light-green hover-black w-100" 
			        	type="text" 
			        	name="name"  
			        	id="name"
			        	onChange ={this.onNameChange}
			        />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
			        	className="pa2 input-reset ba bg-transparent hover-bg-light-green hover-black w-100" 
			        	type="email" 
			        	name="email-address"  
			        	id="email-address"
			        	onChange ={this.onEmailChange}
			        />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
			        	className="b pa2 input-reset ba bg-transparent hover-bg-light-green hover-black w-100" 
			        	type="password" 
			        	name="password"  
			        	id="password"
			        	onChange ={this.onPasswordChange}
			        />
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      	onClick ={this.onSubmitSignin}
			      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      	type="submit" 
			      	value="register"/>
			    </div>
			    
			  </div>
			</main>
		</article>
		);
	}
}

export default Register;