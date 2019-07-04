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
		restaurants: [],			// array of 10 best evaluated restaurants
		selected: 0					// index of the restaurant that's currently on display (index zero is default)
	};

	// getting location ID & cuisine ID from the query string
	componentDidMount() {
		const values = queryString.parse(this.props.location.search);
		this.setState({
			locationId: values.location,
			cuisineId: values.cuisine
		}, this.getRestaurants);
	};

	// getting 10 best evaluated restaurants from an API
	async getRestaurants() {
		if (this.state.locationId !== null && this.state.cuisineId !== null) {
			const api_call = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${ this.state.locationId }&entity_type=city&count=10&cuisines=${ this.state.cuisineId }&sort=rating&order=desc`,
	    								{headers: {'Content-Type': 'application/json', "user-key": API_KEY}})
	    
		    const data = await api_call.json();
		    this.selectRestaurants(data.restaurants);
		}
	 };

	 // select 3 random restaurants
	 selectRestaurants = (copy) => {
		let selectedRestaurants = [];

		for (let i = 0; i < 3; i++) {
			var index = Math.floor(Math.random() * copy.length);
			selectedRestaurants.push(copy[index].restaurant);
			copy.splice(index, 1);
		};

		this.setState({ restaurants: selectedRestaurants });
	};

	render() {
		return(
			<div style={ divStyle }>
				<Restaurant
					restaurant={ this.state.restaurants[this.state.selected] }
				/>
				<MapContainer
					restaurants={ this.state.restaurants }
				/>
			</div>
		)
	}
}


export default Result;