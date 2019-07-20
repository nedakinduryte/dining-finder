import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/styles";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const theme = createMuiTheme({
    palette: {
        primary: { 500: "#34495e" }
    }
});

const styles = {
    grid: {
        display: "grid",
        gridTemplateColumns: "350px 50px",
        gridTemplateRows: "1fr",
        gridTemplateAreas: `
            "restaurant next"
        `
    },
    info: {
        padding: "0 16px",
        gridArea: "restaurant"
    },
    card: {
        height: "calc(100vh - 64px)",
        overflow: "auto",
        borderRadius: "0"
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    header: {
        margin: "20px 0"
    },
    subheader: {
        fontWeight: "600"
    },
    label: {
        fontWeight: "500"
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: "6px 16px 10px"
    },
    button: {
        margin: "0 10px 0 0"
    },
    next: {
        gridArea: "next"
    }
};

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
                        <div className={classes.grid}>
                            <div className={classes.info}>
                                <CardContent>
                                    <h1 className={classes.header}>
                                        {restaurant.name}
                                    </h1>
                                    <p className={classes.subheader}>
                                        {restaurant.cuisines}
                                    </p>
                                    <p>
                                        <span className={classes.label}>
                                            User rating:{" "}
                                        </span>
                                        <span
                                            style={{
                                                color: `#${
                                                    restaurant.user_rating
                                                        .rating_color
                                                }`
                                            }}
                                        >
                                            {restaurant.user_rating.rating_text}{" "}
                                            (
                                            {
                                                restaurant.user_rating
                                                    .aggregate_rating
                                            }{" "}
                                            / 5)
                                        </span>
                                    </p>
                                    <p>
                                        <span className={classes.label}>
                                            Average cost for two:{" "}
                                        </span>
                                        {restaurant.average_cost_for_two}
                                        {restaurant.currency}
                                    </p>
                                    <p>
                                        <span className={classes.label}>
                                            Address:
                                        </span>
                                        <div>
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
                                        color="primary"
                                    >
                                        See menu
                                    </Button>
                                    <Button
                                        variant="contained"
                                        disabled={restaurant.has_table_booking}
                                        href={restaurant.url}
                                        color="primary"
                                    >
                                        Book a table
                                    </Button>
                                </div>
                            </div>
                            <div className={classes.next}>
                                <Button
                                    variant="outlined"
                                    className={classes.button}
                                    onClick={this.props.arrowOnClick}
                                >
                                    >
                                </Button>
                            </div>
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
