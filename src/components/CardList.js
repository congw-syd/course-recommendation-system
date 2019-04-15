import React from 'react';
import Card from './Card';

const CardList =({courses}) =>{
	return(
		<div>
		{
			courses.map((item,i)=>{
			return (
				<Card 
					key={i} 
					courseid={courses[i].courseid} 
					name={courses[i].name}
				/>
				);
			})
		}
		</div>
		);
}

export default CardList;
