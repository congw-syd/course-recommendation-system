import React from 'react';
import Tilt from 'react-tilt';



const Card = ({courseid, name, onRouteChange}) => {
	return(
		<div className='white dib br3 pa3 ma2 grow bw2 shadow-5' >
			<Tilt className="Tilt" options={{ max : 25 }} style={{ display: 'flex', height: 300, width: 250}} >
 				<div className="Tilt-inner"> 
					<img alt='courses' src='https://i.guim.co.uk/img/media/a2ae8cfe64bde752295471eef91494dfcbd1bec7/0_449_6500_3901/master/6500.jpg?width=300&quality=85&auto=format&fit=max&s=7e91e6e0258dd2915ee63cb20ba13772' />
						
							<h2>{courseid}</h2>
							<p>{name}</p>
						
 				</div>
			</Tilt>
		</div>
		);
}


export default Card;



