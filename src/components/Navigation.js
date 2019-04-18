import React from 'react';

const Navigation = ({onRouteChange}) => {
	return(
		<nav style = {{display: 'flex'}}>
			<p 
				onClick={()=>onRouteChange('personinfo')} 
				className='link dim underline pa3 pointer'>Enrolled History</p>
			<p 
				onClick={()=>onRouteChange('signin')} 
				className='link dim underline pa3 pointer'>Sign Out</p>
		</nav>
	);
}

export default Navigation;