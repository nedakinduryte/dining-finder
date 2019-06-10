import React from 'react';
//import queryString from 'query-string';
import LocationAutosuggest from './LocationAutosuggest';
//import CuisineAutosuggest from './CuisineAutosuggest';



class Form extends React.Component {
	state = {
		locationId: null
	};

	handleLocationSelection = locationId => {
		this.setState({ locationId: locationId });
	};

	//handleSubmit = e => {
		//e.preventDefault();
		//const location = e.target.location.value;
		//const query = queryString.stringify({ location: location });
		//this.props.history.push(`/restaurants?${ query }`);
	//}

	render() {
		return (
			<React.Fragment>
				<form /*onSubmit={  }*/>
					<label htmlFor="location">
						Location
						<LocationAutosuggest 
							handleLocationSelection={this.handleLocationSelection}
						/>
					</label>
					<label htmlFor="food">
						Food Mood
					</label>
					<button type="submit">Search</button>
				</form>
			</React.Fragment>
		)
	}
}


export default Form;