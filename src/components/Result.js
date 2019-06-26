import React from 'react';
import Restaurant from './Restaurant';
import queryString from 'query-string';


const API_KEY = "2d0e89daf27dd516eb7dcf5208bd83de";

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
	    const api_call = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${ this.state.locationId }&entity_type=city&count=10&cuisines=${ this.state.cuisineId }&sort=rating&order=desc`,
	    							{headers: {'Content-Type': 'application/json', "user-key": API_KEY}})
	    
	    const data = await api_call.json();
	    this.setState({ restaurants: data.restaurants })
	    console.log(this.state.restaurants);
	 };

	render() {
		return(
			<Restaurant />
		)
	}
}


export default Result;