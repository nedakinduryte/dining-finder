import React from "react";
import Restaurant from "./Restaurant";
import queryString from "query-string";
import MapContainer from "./MapContainer";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "../dark-logo.png";

const API_KEY = "2d0e89daf27dd516eb7dcf5208bd83de";

const styles = {
    root: {
		gridArea: "header",
		zIndex: "2"
    },
    container: {
		maxHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridTemplateRows: "64px 1fr",
        gridTemplateAreas: `
			"header header header header"
			"info map map map"
		`
	},
	logo: {
		height: "20px",
		paddingTop: "10px"
	},
    restaurant: {
		gridArea: "info"
    },
    map: {
        gridArea: "map"
    }
};

class Result extends React.Component {
    state = {
        locationId: null,
        cuisineId: null,
        restaurants: [], // array of 10 best evaluated restaurants
        selected: 0 // index of the restaurant that's currently on display (index zero is default)
    };

    // getting location ID & cuisine ID from the query string
    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        this.setState(
            {
                locationId: values.location,
                cuisineId: values.cuisine
            },
            this.getRestaurants
        );
    }

    // getting 10 best evaluated restaurants from an API
    async getRestaurants() {
        if (this.state.locationId !== null && this.state.cuisineId !== null) {
            const api_call = await fetch(
                `https://developers.zomato.com/api/v2.1/search?entity_id=${
                    this.state.locationId
                }&entity_type=city&count=10&cuisines=${
                    this.state.cuisineId
                }&sort=rating&order=desc`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "user-key": API_KEY
                    }
                }
            );

            const data = await api_call.json();
            this.selectRestaurants(data.restaurants);
        }
    }

    // select 3 random restaurants
    selectRestaurants = copy => {
        let selectedRestaurants = [];

        for (let i = 0; i < 3; i++) {
            var index = Math.floor(Math.random() * copy.length);
            selectedRestaurants.push(copy[index].restaurant);
            copy.splice(index, 1);
        }

        this.setState({ restaurants: selectedRestaurants });
    };

    // Changing the restaurant on display when the marker is clicked
    markerOnClick = name => {
        this.state.restaurants.map((cur, idx) => {
            if (cur.name === name) {
                this.setState({ selected: idx });
            }
        });
    };

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.container}>
                <div className={ classes.root }>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
								<img className={classes.logo} alt="logo" src={logo} />
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <Restaurant
                    className={classes.restaurant}
                    restaurant={this.state.restaurants[this.state.selected]}
                />
                <MapContainer
                    className={classes.map}
                    restaurants={this.state.restaurants}
                    markerOnClick={this.markerOnClick}
                />
            </div>
        );
    }
}

export default withStyles(styles)(Result);
