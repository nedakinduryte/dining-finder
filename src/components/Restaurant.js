import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { withStyles, createStyles } from "@material-ui/styles";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const theme = createMuiTheme({});

const styles = createStyles(theme => ({
    card: {
        height: "calc(100vh - 64px)",
        overflow: "auto"
    },
    media: {
        height: 0,
		paddingTop: "56.25%" // 16:9
	},
	subheader: {
		fontWeight: "600"
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
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
                            image={restaurant.featured_image}
                            title={restaurant.name}
                        />
                        <CardContent>
                            <h1 className={ classes.header }>{restaurant.name}</h1>
                            <p className={ classes.subheader }>{restaurant.cuisines}</p>
                            <p className={ classes.paragraph }>
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
                            <p className={ classes.paragraph }>
                                Average cost for two:{" "}
                                {restaurant.average_cost_for_two}
                                {restaurant.currency}
                            </p>
                            <p className={ classes.paragraph }>
                                Address:
                                <div className={ classes.paragraph }>
									{restaurant.location.locality}
									<br />
									{restaurant.location.zipcode}
									<br />
									{restaurant.location.city}
								</div>
                            </p>
                        </CardContent>
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                className={classes.button}
                                href={restaurant.menu_url}
                            >
                                See menu
                            </Button>
                            <Button
                                variant="contained"
                                disabled={ restaurant.has_table_booking }
                                className={classes.button}
                                href={restaurant.url}
                            >
                                Book a table
                            </Button>
                        </div>
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
