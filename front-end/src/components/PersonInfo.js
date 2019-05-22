import React from 'react';
import Card from './Card';

class PersonInfo extends React.Component {
	constructor(props){
		super(props);
		this.state={
			history:[],
			recom:[]
		}
	}
	componentDidMount(){
		var that = this;
		fetch('http://localhost:3000/gethistory')
		.then(response => response.json())
		.then(function(data){
			that.setState({history:data})
		});
		fetch('http://localhost:3000/getrecombystu')
		.then(response => response.json())
		.then(function(data){
			that.setState({recom:data})
		});
	}
	render(){
		const {history,recom} = this.state;
		const {sid,onRouteChange} = this.props;
		return(
			<div>
			<h2 >Enrolled Course History</h2>
				<div className='black dib br3 pa3 ma2 grow bw2 shadow-5'>
				{history.map((item,i)=>{
						if(item.studentid===sid)
							return (
							  <td class="pv3 pr3 bb b--black-20 bg-lightgreen" key={i}>{history[i].courseid}</td>		    
						 	)
					})
				}
				<p onClick ={()=>onRouteChange('addhistory')} className="link dim underline pa3 pointer">Add History</p>
				</div>
				
			<h2>Recommendation for you</h2>
			<div> 
			{	
				recom.map((data,j)=>{
					if(data.studentid===sid)
						return (
							<Card 
								onRouteChange = {onRouteChange}
								key={j} 
								courseid={recom[j].courseid} 
								name={recom[j].name}
							/>	
					 	)
				})
			}
			</div>
			
		</div>
		);
	}
}
export default PersonInfo;
