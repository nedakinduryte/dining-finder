import React from 'react';


class Form extends React.Component {
	render() {
		return (
			<form onSubmit={this.props.handleSubmit}>
				<label htmlFor="location">
					Location
					<input id="location" type="text" name="location" />
				</label>
				<label htmlFor="food">
					Food Mood
					<input id="food" type="text" name="food" />
				</label>
				<button>Search</button>
			</form>
		)
	}
}


export default Form;