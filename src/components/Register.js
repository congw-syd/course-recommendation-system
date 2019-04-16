import React from 'react';

const Register = ({onRouteChange}) => {
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
			        />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
			        	className="pa2 input-reset ba bg-transparent hover-bg-light-green hover-black w-100" 
			        	type="email" 
			        	name="email-address"  
			        	id="email-address"
			        />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
			        	className="b pa2 input-reset ba bg-transparent hover-bg-light-green hover-black w-100" 
			        	type="password" 
			        	name="password"  
			        	id="password"
			        />
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      	onClick ={()=>onRouteChange('personinfo')}
			      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      	type="submit" 
			      	value="register"/>
			    </div>
			    
			  </div>
			</main>
		</article>
	);
}

export default Register;