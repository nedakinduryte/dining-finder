import React from 'react';
import queryString from 'query-string';


class Form extends React.Component {

	handleSubmit = e => {
		e.preventDefault();
		const location = e.target.location.value;
		const query = queryString.stringify({ location: location });
		this.props.history.push(`/restaurants?${ query }`);
	}

	render() {
		return (
			<form onSubmit={ this.handleSubmit }>
				<label htmlFor="location">
					Location
					<input id="location" type="text" name="location" />
				</label>
				<label htmlFor="food">
					Food Mood
					<input id="food" type="text" name="food" />
				</label>
				<button type="submit">Search</button>
			</form>
		)
	}
}


export default Form;