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
		height: "40px",
		padding: "8px 22px",
		alignSelf: "flex-end"
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
        alignItems: "start"
    },
    form: {
		gridArea: "form",
		borderRadius: "4px",
		backgroundColor: "#ffffff",
		padding: "32px 32px 24px 32px",
		width: "377px",
		height: "324px",
		boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		margin: "25px 0 0 76px"
	},
	h1: {
		fontSize: "24px",
		fontWeight: "700",
		margin: "0",
		padding: "0"
	},
    logo: {
		height: "20px",
		padding: "30px 30px",
		gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr 1fr 1fr",
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
					<h1 className={ classes.h1 }>Find the best places to eat at in your city.</h1>
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
