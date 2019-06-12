import React from 'react';
import Autosuggest from 'react-autosuggest';


const API_KEY = "2d0e89daf27dd516eb7dcf5208bd83de";

class CuisineAutocomplete extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
			suggestions: [],
			cuisines: [],
			locationId: this.props.locationId
		};
	};

	componentDidMount = async value => {
		const api_call = await fetch(`https://developers.zomato.com/api/v2.1/cuisines?city_id=${this.state.locationId}`, 
										{ headers: { 'Content-Type': 'application/json', "user-key": API_KEY }});

		const data = await api_call.json();
		this.setState({ cuisines: data.cuisines });
		console.log(data);
	};

	getSuggestions = value => {
	  	const inputValue = value.trim().toLowerCase();
	  	const inputLength = inputValue.length;

	  	return inputLength === 0 ? [] : this.state.cuisines.filter(s => 
		    s.cuisine.cuisine_name.toLowerCase().slice(0, inputLength) === inputValue
	  	);
	};

	getSuggestionValue = suggestion => suggestion.cuisine.cuisine_name;

	renderSuggestion = suggestion => {
		return <div>{ suggestion.cuisine.cuisine_name }</div>
	};

	onChange = (event, { newValue }) => this.setState({ value: newValue });

	// Autosuggest will call this function every time you need to update suggestions.
	onSuggestionsFetchRequested = ({ value }) => this.setState({ suggestions: this.getSuggestions(value) });

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => this.setState({ suggestions: [] });

	// getting cuisine id.
	handleSelection = e => {
		e.preventDefault();
		const selection = this.state.suggestions.filter(s => s.cuisine.cuisine_name === e.target.innerHTML);
		if (selection.length > 0 && selection[0].hasOwnProperty("cuisine_id")) {
			this.props.handleCuisineSelection(selection[0].cuisine_id);
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
				    placeholder: 'Type a cuisine',
				    value: this.state.value,
				    onChange: this.onChange
				}}
		    />
		)
	}	
};


export default CuisineAutocomplete;