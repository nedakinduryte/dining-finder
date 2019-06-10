import React from 'react';
//import queryString from 'query-string';
import Autocomplete from './Autocomplete';
import ClickAway from './Dropdown';


class Form extends React.Component {
	constructor() {
		super();
		this.state = {
			locationId: null
		};
	};

	handleLocationSelection = locationId => this.setState({ locationId });


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
						<Autocomplete 
							handleLocationSelection={this.handleLocationSelection}
						/>
					</label>
					<label htmlFor="food">
						Food Mood
						{ this.state.locationId ? <ClickAway locationId={this.state.locationId} /> : null }
					</label>
					<button type="submit">Search</button>
				</form>
			</React.Fragment>
		)
	}
}


export default Form;