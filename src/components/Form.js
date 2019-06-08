import React from 'react';
//import queryString from 'query-string';
import LocationAutosuggest from './LocationAutosuggest'




// component autocomplete
// render only autosuggest
// pass in api_call as prop

class Form extends React.Component {
	state = {
		cityId: undefined
	};

	getCityId = value => {
		this.setState({ cityId: value })
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
							getCityId={this.getCityId}
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