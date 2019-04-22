import React from 'react';

class Signin extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			signInSid: '',
			signInPassword: ''
		}
	}

	onSidChange =(event) =>{
		this.setState({signInSid: event.target.value})
	}

	onPasswordChange =(event) =>{
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignin =() =>{
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				studentid: this.state.signInSid,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
			.then(user => {
				if(user.studentid){
					this.props.loadUser(user)
					this.props.onRouteChange('home');
				}else{
					alert('wrong credentials')
				}
			})	
	}

	render(){
		const {onRouteChange} = this.props;
		return(
			<article className="br3 ba dark-gray b--black-10 mv4 mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">StudentId</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-light-green hover-black w-100" 
				        	type="text" 
				        	name="sid"  
				        	id="sid"
				        	onChange ={this.onSidChange}
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        	className="b pa2 input-reset ba bg-transparent hover-bg-light-green hover-black w-100" 
				        	type="password" 
				        	name="password"  
				        	id="password"
				        	onChange = {this.onPasswordChange}
				        />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      	onClick ={this.onSubmitSignin}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value="Sign in"/>
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick ={()=>onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
				    </div>
				  </div>
				</main>
			</article>
		);
	}
	
}

export default Signin;