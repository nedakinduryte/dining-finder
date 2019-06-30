import React from 'react';
import Restaurant from './Restaurant';
import queryString from 'query-string';
import MapContainer from './MapContainer';


const API_KEY = "2d0e89daf27dd516eb7dcf5208bd83de";

const divStyle = {
	display: 'flex',
    flexDirection: 'row'
};

class Result extends React.Component {
	state = {
		locationId: null,
		cuisineId: null,
		restaurants: []
	};

	componentDidMount() {
		const values = queryString.parse(this.props.location.search);
		this.setState({
			locationId: values.location,
			cuisineId: values.cuisine
		}, this.getRestaurants);
	};

	async getRestaurants() {
		if (this.state.locationId !== null && this.state.cuisineId !== null) {
			const api_call = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${ this.state.locationId }&entity_type=city&count=10&cuisines=${ this.state.cuisineId }&sort=rating&order=desc`,
	    								{headers: {'Content-Type': 'application/json', "user-key": API_KEY}})
	    
		    const data = await api_call.json();
		    this.setState({ restaurants: data.restaurants })
		    console.log(this.state.restaurants);
		}
	 };

	render() {
		return(
			<div style={divStyle}>
				<Restaurant
					restaurants={this.state.restaurants}
				/>
				<MapContainer />
			</div>
		)
	}
}


export default Result;