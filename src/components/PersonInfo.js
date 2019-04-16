import React from 'react';

const PersonInfo = ({onRouteChange}) =>{
	return(
		<article className="br3 ba dark-gray b--black-10 mv4 mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="regist_er" className="ba b--transparent ph0 mh0">
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="enrollcourse">Enrolled Course History</label>
			        <input 
			        	className="pa2 input-reset ba bg-transparent hover-bg-light-green hover-black w-100" 
			        	type="text" 
			        	name="enrollcourse"  
			        	id="enrollcourse"
			        />
			        <small id="name-desc" class="f6 black-60 db mb2">Please input in the format of (courseid,rating), seperate different courses using ';' </small>
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      	onClick ={()=>onRouteChange('home')}
			      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      	type="submit" 
			      	value="Confirm"
			      />
			      <p onClick ={()=>onRouteChange('home')} className="f6 link dim black db pointer">Skip</p>
			    </div>
			    
			  </div>
			</main>
		</article>
	);
}

export default PersonInfo;