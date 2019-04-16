import React from 'react';

const Navigation = ({onRouteChange}) => {
	return(
		<nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
			<p onClick={()=>onRouteChange('personinfo')} className='f5 link dim light-green underline pa3 pointer'>Enrolled History</p>
			<p onClick={()=>onRouteChange('signin')} className='f5 link dim light-green underline pa3 pointer'>Sign Out</p>
		</nav>
	);
}

export default Navigation;