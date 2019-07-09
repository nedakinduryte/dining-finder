import React from "react";
import queryString from "query-string";
import Location from "./Location";
import Cuisine from "./Cuisine";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import logo from "../light-logo.png";
import background from "../background.jpg";

const styles = {
    button: {
        margin: "20px"
    },
    input: {
        display: "none"
    },
    root: {
        flexGrow: 1,
        gridArea: "header"
    },
    main: {
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 9fr",
        gridTemplateAreas: `
			"header header"
			"form blank"
		`,
        alignItems: "center"
    },
    form: {
        gridArea: "form",
		padding: "30px 70px",
		margin: "0 100px",
		borderRadius: "5px",
		backgroundColor: "rgba(255, 255, 255, 0.95)",
		width: "300px"
    },
    logo: {
		height: "20px",
		padding: "30px 30px"
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
                    <img className={classes.logo} alt="logo" src={logo} />
                </div>
                <div className={classes.form}>
                    <Location
                        handleLocationSelection={this.handleLocationSelection}
                    />
                    <Cuisine
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
