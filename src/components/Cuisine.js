
import React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { withStyles, createStyles } from '@material-ui/core/styles';


const API_KEY = "2d0e89daf27dd516eb7dcf5208bd83de";

const styles = createStyles({
	root: {
	    height: 250,
	    flexGrow: 1,
	    padding: '12px'
	},
	container: {
	    position: 'relative',
	},
	suggestionsContainerOpen: {
	    position: 'absolute',
	    zIndex: 1,
	    marginTop: '24px',
	    left: 0,
	    right: 0,
	},
	suggestion: {
	    display: 'block',
	},
	suggestionsList: {
	    margin: 0,
	    padding: 0,
	    listStyleType: 'none',
	},
});

function renderSuggestion(suggestion, { query, isHighlighted }){
	const matches = match(suggestion.cuisine.cuisine_name, query);
	const parts = parse(suggestion.cuisine.cuisine_name, matches);

	return (
	    <MenuItem selected={isHighlighted} component="div">
	      	<div>
	        	{parts.map(part => (
	          		<span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
	            		{part.text}
	          		</span>
	        	))}
	      	</div>
	    </MenuItem>
	);
};


function renderInputComponent(inputProps){
  	const { classes, inputRef = () => {}, ref, ...other } = inputProps;

	return (
	    <TextField
	      	fullWidth
	      	InputProps={{
		        inputRef: node => {
		          	ref(node);
		          	inputRef(node);
		        },
		        classes: {
		          	input: classes.input,
		        },
	      	}}
	      	{...other}
	    />
	);
};

class Cuisine extends React.Component {
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
		const selection = this.state.suggestions.filter(s => s.cuisine.cuisine_name === e.target.innerHTML);
		if (selection.length > 0 && selection[0].cuisine.hasOwnProperty("cuisine_id")) {
			this.props.handleCuisineSelection(selection[0].cuisine.cuisine_id);
		};
	};

	render() {
		const classes = this.props.classes;
		return (
			<div className={classes.root}>
				<Autosuggest
			        suggestions={this.state.suggestions}
			        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
			        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
			        getSuggestionValue={this.getSuggestionValue}
			        onSuggestionSelected={this.handleSelection}
			        renderSuggestion={this.renderSuggestion}
			        renderInputComponent={renderInputComponent}
			        inputProps={{
			        	classes,
				        id: 'react-autosuggest-simple',
				        label: 'Cuisine',
					    placeholder: 'Type a cuisine',
					    value: this.state.value,
					    onChange: this.onChange
					}}
					theme={{
			          	container: classes.container,
			          	suggestionsContainerOpen: classes.suggestionsContainerOpen,
			          	suggestionsList: classes.suggestionsList,
			          	suggestion: classes.suggestion,
			        }}
			        renderSuggestionsContainer={options => (
			          	<Paper {...options.containerProps} square>
			            	{options.children}
			          	</Paper>
			        )}
			    />
			</div>
		)
	}	
};


export default withStyles(styles)(Cuisine);