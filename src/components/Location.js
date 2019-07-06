import React from "react";
import Autosuggest from "react-autosuggest";
import _ from "lodash";
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
        height: 250,
        flexGrow: 1,
        padding: "12px"
    },
    container: {
        position: "relative"
    },
    suggestionsContainerOpen: {
        position: "absolute",
        zIndex: 1,
        marginTop: "24px",
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
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

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
                    input: classes.input
                }
            }}
            {...other}
        />
    );
}

class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            suggestions: []
        };

        this.debouncedLoadSuggestions = _.debounce(this.loadSuggestions, 200);
    }

    loadSuggestions = async value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        if (inputLength > 2) {
            const api_call = await fetch(
                `https://developers.zomato.com/api/v2.1/cities?q=${value}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "user-key": API_KEY
                    }
                }
            );
            const data = await api_call.json();
            this.setState({ suggestions: data.location_suggestions });
        } else {
            return [];
        }
    };

    getSuggestionValue = suggestion => suggestion.name;

    onChange = (event, { newValue }) => this.setState({ value: newValue });

    // Autosuggest will call this function every time you need to update suggestions.
    onSuggestionsFetchRequested = ({ value }) =>
        this.debouncedLoadSuggestions(value);

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => this.setState({ suggestions: [] });

    // Getting city id.
    handleSelection = (event, { suggestion }) => {
        this.props.handleLocationSelection(suggestion.id);
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
                        label: "Location",
                        placeholder: "Type a city",
                        value: this.state.value,
                        onChange: this.onChange
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

Location.propTypes = {
    handleLocationSelection: PropTypes.func.isRequired
};

export default withStyles(styles)(Location);
