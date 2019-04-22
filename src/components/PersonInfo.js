import React from 'react';
import Card from './Card';


/*const PersonInfo  =({courses,results,onRouteChange}) =>{
	
		return(
			<div>
				<h2>Enrolled Course History</h2>
				<p 
			      	onClick ={()=>onRouteChange('addhistory')} 
			      	className="link dim underline pa3 pointer">Add History
			    </p> 
				<CardList courses={courses}/><br />
				<h2>Recommendation for you</h2>
				<CardList courses={results}/>
		 	</div>
		);
}*/

const PersonInfo  =({sid,history,onRouteChange}) =>{
	return(
		<div>
		<p 
			      	onClick ={()=>onRouteChange('addhistory')} 
			      	className="link dim underline pa3 pointer">Add History
			    </p>
		<h2> 
		{
			history.map((item,i)=>
				
					<p key={i}>{item.courseid}</p>
				
				
			)
				
		}
		</h2>
		
		</div>
	);
}	

export default PersonInfo;
