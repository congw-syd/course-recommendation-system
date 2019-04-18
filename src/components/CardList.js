import React from 'react';
import Card from './Card';

const CardList =({courses, onRouteChange}) =>{
	return(
		<div >
		{
			courses.map((item,i)=>{
			return (
				<Card 
					onRouteChange = {onRouteChange}
					key={i} 
					courseid={courses[i].courseid} 
					name={courses[i].name}
					//imgurl={courses[i].imgurl}
				/>
				);
			})
		}
		</div>
		);
}

export default CardList;

