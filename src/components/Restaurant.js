import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import { withStyles, createStyles } from "@material-ui/styles";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const theme = createMuiTheme({});

const styles = createStyles(theme => ({
    card: {
		height: "100%"
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    avatar: {
        backgroundColor: red[500]
    },
    button: {
        margin: "20px"
    },
    input: {
        display: "none"
    },
    link: {
		margin: "10px 0",
		fontFamily: "'Montserrat', sans-serif"
	},
	address: {
		padding: "0 10px"
	}
}));

class Restaurant extends React.Component {
    render() {
        const restaurant = this.props.restaurant;
        const classes = this.props.classes;

        if (restaurant) {
            return (
                <ThemeProvider theme={theme}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            image={restaurant.thumb}
                            title={restaurant.name}
                        />
                        <CardContent>
                            <h1>{restaurant.name}</h1>
                            <p>{restaurant.cuisines}</p>
                            <p>
                                User rating:{" "}
                                <span
                                    style={{
                                        color: `#${
                                            restaurant.user_rating.rating_color
                                        }`
                                    }}
                                >
                                    {restaurant.user_rating.rating_text} (
                                    {restaurant.user_rating.aggregate_rating} /
                                    5)
                                </span>
                            </p>
                            <Typography>
                                <Link href={restaurant.menu_url} className={classes.link}>
                                    Menu
                                </Link>
                            </Typography>
                            <p>
                                Average cost for two:{" "}
                                {restaurant.average_cost_for_two}
                                {restaurant.currency}
                            </p>
                            <p>
                                Address:
                                <div className={ classes.address }>
									{restaurant.location.locality}
									<br />
									{restaurant.location.zipcode}
									<br />
									{restaurant.location.city}
								</div>
                            </p>
                        </CardContent>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={restaurant.url}
                        >
                            Book a table
                        </Button>
                    </Card>
                </ThemeProvider>
            );
        } else {
            return <div />;
        }
    }
}

Restaurant.propTypes = {
    restaurant: PropTypes.object.isRequired
};

export default withStyles(styles)(Restaurant);
