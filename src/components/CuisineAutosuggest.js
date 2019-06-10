import React from 'react';
import Autosuggest from 'react-autosuggest';
import _ from 'lodash';


const API_KEY = "2d0e89daf27dd516eb7dcf5208bd83de";

class CuisisneAutosuggest extends React.Component {
	constructor() {
		super();

		this.state = {
			value: "",
			suggestions: [],
			cityId: this.props.cityId
		};

		this.debouncedLoadSuggestions = _.debounce(this.loadSuggestions);
	};

	loadSuggestions = async value => {
	  	const inputValue = value.trim().toLowerCase();
	  	const inputLength = inputValue.length;

	  	if (inputLength < 2) {
	  		return [];
	  	} else {
			const api_call = await fetch(`https://developers.zomato.com/api/v2.1/cuisines?city_id=${this.state.cityId}`, 
										 { headers: { 'Content-Type': 'application/json', "user-key": API_KEY }});
			const data = await api_call.json();
			this.setState({ suggestions: data.cuisines });
		};
	};

	getSuggestionValue = suggestion => suggestion.cuisine.cuisine_name;

	renderSuggestion = suggestion => {
		return <div>{ suggestion.cuisine.cuisine_name }</div>
	};

	onChange = (event, { newValue }) => {
		this.setState({
		   	value: newValue
		});
		this.props.getCityId(this.state.suggestions);
	};

	// Autosuggest will call this function every time you need to update suggestions.
	onSuggestionsFetchRequested = ({ value }) => {
	    this.debouncedLoadSuggestions(value);
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	render() {
		return (
			<Autosuggest
		        suggestions={this.state.suggestions}
		        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
		        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
		        getSuggestionValue={this.getSuggestionValue}
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


export default CuisisneAutosuggest;