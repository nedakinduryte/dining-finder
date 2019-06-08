import React from 'react';
//import queryString from 'query-string';
import Autocomplete from './Autocomplete';




// component autocomplete
// render only autosuggest
// pass in api_call as prop

class Form extends React.Component {

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
						<Autocomplete />
					</label>
					<label htmlFor="food">
						Food Mood
						<Autocomplete />
					</label>
					<button type="submit">Search</button>
				</form>
			</React.Fragment>
		)
	}
}


export default Form;