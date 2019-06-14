import React from 'react';
//import queryString from 'query-string';
import Location from './Location';
import Cuisine from './Cuisine';


class Search extends React.Component {
	constructor() {
		super();
		this.state = {
			locationId: null,
			cuisineId: null
		};
	};

	handleLocationSelection = locationId => this.setState({ locationId });

	handleCuisineSelection = cuisineId => this.setState({ cuisineId });

	//handleSubmit = e => {
		//e.preventDefault();
		//const location = e.target.location.value;
		//const query = queryString.stringify({ location: location });
		//this.props.history.push(`/restaurants?${ query }`);
	//}

	render() {
		return (
			<React.Fragment>
				<Location 
					handleLocationSelection={this.handleLocationSelection}
				/>
				<Cuisine
					locationId={this.state.locationId}
					handleCuisineSelection={this.handleCuisineSelection}
				/>
				<button type="submit">Search</button>
			</React.Fragment>
		)
	}
}


export default Search;