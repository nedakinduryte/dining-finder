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
        alignSelf: "flex-end",
        boxShadow: "none",
        backgroundColor: "#34495e",
        padding: "10px 20px",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "600",
        letterSpacing: 0,
        textTransform: "none",
        fontFamily: "Montserrat",
        "&:hover": {
            backgroundColor: "#5c6d7e"
		},
		"@media screen and (max-width: 745px)": {
			width: "calc(100vw - 40px)",
			padding: "10px",
			margin: "0 0 20px",
			alignSelf: "center"
		},
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
        gridTemplateColumns: "1fr",
        gridTemplateRows: "80px 1fr",
        gridTemplateAreas: `
			"header"
			"form"
		`,
		alignItems: "start"
    },
    form: {
        gridArea: "form",
        borderRadius: "4px",
        backgroundColor: "#fff",
        padding: "32px 32px 24px 32px",
        width: "380px",
        boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        margin: "0 0 80px 80px",
        "@media screen and (max-width: 900px)": {
            justifySelf: "center",
            alignSelf: "start",
            margin: "100px 0 0"
		},
		"@media screen and (max-width: 745px)": {
			width: "calc(100vw - 40px)",
			margin: "0",
			padding: "20px",
			justifySelf: "center",
			backgroundColor: "transparent"
        }
	},
	mobileForm: {
		"@media screen and (max-width: 745px)": {
			alignSelf: "center",
			backgroundColor: "#fff",
			display: "flex",
			flexDirection: "column"
		}
	},
    h1: {
        color: "rgb(72, 72, 72)",
        fontSize: "2em",
        fontWeight: "700",
        margin: "0",
		padding: "0 0 30px",
		"@media screen and (max-width: 745px)": {
			color: "#fff",
			padding: "0 0 15px"
		}
    },
    logo: {
        height: "20px",
        padding: "30px"
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
                    <h1 className={classes.h1}>
                        Find the best places to eat in your city.
                    </h1>
					<div className={classes.mobileForm}>
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
            </div>
        );
    }
}

export default withStyles(styles)(Search);
