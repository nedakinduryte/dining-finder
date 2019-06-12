import React from 'react';
import Autosuggest from 'react-autosuggest';
import _ from 'lodash';


const API_KEY = "2d0e89daf27dd516eb7dcf5208bd83de";

class LocAutocomplete extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
			suggestions: []
		};
		this.debouncedLoadSuggestions = _.debounce(this.loadSuggestions);
	};

	loadSuggestions = async value => {
	  	const inputValue = value.trim().toLowerCase();
	  	const inputLength = inputValue.length;

	  	if (inputLength < 2) {
	  		return [];
	  	} else {
			const api_call = await fetch(`https://developers.zomato.com/api/v2.1/cities?q=${value}`, 
										 { headers: { 'Content-Type': 'application/json', "user-key": API_KEY }});
			const data = await api_call.json();
			this.setState({ suggestions: data.location_suggestions });
		};
	};

	getSuggestionValue = suggestion => suggestion.name;

	renderSuggestion = suggestion => {
		return <div>{ suggestion.name }</div>
	};

	onChange = (event, { newValue }) => this.setState({ value: newValue });

	// Autosuggest will call this function every time you need to update suggestions.
	onSuggestionsFetchRequested = ({ value }) => this.debouncedLoadSuggestions(value);

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => this.setState({ suggestions: [] });

	// Getting city id.
	handleSelection = e => {
		e.preventDefault();
		const selection = this.state.suggestions.filter(s => s.name === e.target.innerHTML);
		if (selection.length > 0 && selection[0].hasOwnProperty("id")) {
			this.props.handleLocationSelection(selection[0].id);
		};
	};

	render() {
		return (
			<Autosuggest
		        suggestions={this.state.suggestions}
		        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
		        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
		        getSuggestionValue={this.getSuggestionValue}
		        onSuggestionSelected={this.handleSelection}
		        renderSuggestion={this.renderSuggestion}
		        inputProps={{
				    placeholder: 'Type a city',
				    value: this.state.value,
				    onChange: this.onChange
				}}
		    />
		)
	}
}


export default LocAutocomplete;