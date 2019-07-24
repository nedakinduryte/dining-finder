import React from "react";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles, createStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const API_KEY = "2d0e89daf27dd516eb7dcf5208bd83de";

const styles = createStyles({
    root: {
		width: "100%",
		alignSelf: "end",
		padding: "0 0 30px",
		"& label.Mui-focused": {
			color: "#34495e"
		},
		"& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
				borderColor: "#34495e",
				border: "1px solid #34495e"
            }
		},
		"@media screen and (max-width: 745px)": {
			width: "calc(100vw - 40px)",
			alignSelf: "center",
			padding: "0 20px 20px"
        }
	},
    container: {
        position: "relative"
    },
    suggestionsContainerOpen: {
        position: "absolute",
        zIndex: 1,
        left: 0,
        right: 0
    },
    suggestion: {
        display: "block"
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: "none"
    }
});

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.cuisine.cuisine_name, query);
    const parts = parse(suggestion.cuisine.cuisine_name, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map(part => (
                    <span
                        key={part.text}
                        style={{ fontWeight: part.highlight ? 500 : 400 }}
                    >
                        {part.text}
                    </span>
                ))}
            </div>
        </MenuItem>
    );
}

function renderInputComponent(inputProps) {
    const {
        classes,
        inputRef = () => {},
        ref,
        locationId,
        ...other
    } = inputProps;

    return (
        <TextField
			variant="outlined"
            fullWidth
            disabled={locationId === null}
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input
                }
            }}
            {...other}
        />
    );
}

class Cuisine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            suggestions: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.locationId !== this.props.locationId &&
            this.props.locationId !== null
        ) {
            this.loadSuggestion();
        }
    }

    async loadSuggestion() {
        const response = await fetch(
            `https://developers.zomato.com/api/v2.1/cuisines?city_id=${
                this.props.locationId
            }`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "user-key": API_KEY
                }
            }
        );
        const data = await response.json();
        this.setState({ suggestions: data.cuisines });
    }

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0
            ? []
            : this.state.suggestions.filter(
                  s =>
                      s.cuisine.cuisine_name
                          .toLowerCase()
                          .slice(0, inputLength) === inputValue
              );
    };

    getSuggestionValue = suggestion => suggestion.cuisine.cuisine_name;

    onChange = (event, { newValue }) => this.setState({ value: newValue });

    // Autosuggest will call this function every time you need to update suggestions
    onSuggestionsFetchRequested = ({ value }) =>
        this.setState({ suggestions: this.getSuggestions(value) });

    // Autosuggest will call this function every time you need to clear suggestions
    onSuggestionsClearRequested = () => this.setState({ suggestions: [] });

    // Getting cuisine id
    handleSelection = (event, { suggestion }) => {
        this.props.handleCuisineSelection(suggestion.cuisine.cuisine_id);
    };

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={
                        this.onSuggestionsFetchRequested
                    }
                    onSuggestionsClearRequested={
                        this.onSuggestionsClearRequested
                    }
                    getSuggestionValue={this.getSuggestionValue}
                    onSuggestionSelected={this.handleSelection}
                    renderSuggestion={renderSuggestion}
                    renderInputComponent={renderInputComponent}
                    inputProps={{
                        classes,
                        id: "react-autosuggest-simple",
                        label: "Cuisine",
                        placeholder: "Type a cuisine",
                        value: this.state.value,
                        onChange: this.onChange,
                        locationId: this.props.locationId
                    }}
                    theme={{
                        container: classes.container,
                        suggestionsContainerOpen:
                            classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion
                    }}
                    renderSuggestionsContainer={options => (
                        <Paper {...options.containerProps} square>
                            {options.children}
                        </Paper>
                    )}
                />
            </div>
        );
    }
}

Cuisine.propTypes = {
	locationId: PropTypes.number,
	handleCuisineSelection: PropTypes.func.isRequired
}

export default withStyles(styles)(Cuisine);
