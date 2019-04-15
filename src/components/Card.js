import React from 'react';

const Card = ({courseid, name}) => {
	return(
		<div className='bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
			<img alt='courses' src='https://i.guim.co.uk/img/media/a2ae8cfe64bde752295471eef91494dfcbd1bec7/0_449_6500_3901/master/6500.jpg?width=300&quality=85&auto=format&fit=max&s=7e91e6e0258dd2915ee63cb20ba13772' />
			<div>
				<h2>{courseid}</h2>
				<p>{name}</p>
			</div>
		</div>
		);
}

export default Card;
