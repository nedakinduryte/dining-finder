import React from 'react';
import Restaurant from './Restaurant';
import queryString from 'query-string';

class Result extends React.Component {
	state = {
		locationId: null,
		cuisineId: null
	}


	componentDidMount() {
		const values = queryString.parse(this.props.location.search);
		this.setState({
			locationId: values.location,
			cuisineId: values.cuisine
		})
	};

	render() {
		return(
			<Restaurant
				locationId={this.state.locationId}
				cuisineId={this.state.cuisineId}
			/>
		)
	}
}


export default Result;