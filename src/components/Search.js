import React from "react";
import queryString from "query-string";
import Location from "./Location";
import Cuisine from "./Cuisine";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = {
    button: {
        margin: "20px"
    },
    input: {
        display: "none"
    },
    root: {
		flexGrow: 1,
		width: "100%"
	},
	main: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	form: {
		height: "400px",
		width: "500px",
		display: "flex",
		flexDirection: "column",
		paddingTop: "50px"
	},
	location: {
		height: "200px"
	},
	cuisine: {
		height: "200px"
	}
};

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationId: null,
            cuisineId: null
        };
    }

    handleLocationSelection = locationId => {
        this.setState({ locationId });
    };

    handleCuisineSelection = cuisineId => this.setState({ cuisineId });

    handleSubmit = e => {
        e.preventDefault();
        const query = queryString.stringify({
            location: this.state.locationId,
            cuisine: this.state.cuisineId
        });
        this.props.history.push(`/restaurants?${query}`);
    };

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.main}>
                <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                Photos
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className={classes.form}>
                    <Location
						className={classes.location}
                        handleLocationSelection={this.handleLocationSelection}
                    />
                    <Cuisine
						className={classes.cuisine}
                        locationId={this.state.locationId}
                        handleCuisineSelection={this.handleCuisineSelection}
                    />
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={this.handleSubmit}
                    >
                        Search
                    </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Search);
