import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/styles";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ChevronRight from "@material-ui/icons/ChevronRight";
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
        gridTemplateRows: "1fr 72px",
        gridTemplateAreas: `
            "restaurant next"
            "buttons buttons"
        `,
        "@media screen and (max-width: 745px)": {
            gridTemplateColumns: "calc(100vw - 40px) 40px"
        }
    },
    info: {
        padding: "0",
        gridArea: "restaurant"
    },
    card: {
        overflow: "auto",
        borderRadius: "0",
        "@media screen and (max-width: 745px)": {
            height: "100%",
            overflow: "none"
        },
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    cardContent: {
        padding: "36px 16px"
    },
    header: {
        margin: "0 0 20px"
    },
    subheader: {
        fontWeight: "600",
        margin: "0 0 14px"
    },
    label: {
        fontWeight: "500"
    },
    paragraph: {
        margin: "0 0 14px"
    },
    address: {
        margin: "0"
    },
    gridButtons: {
        gridArea: "buttons"
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: "0 16px 36px",
        "@media screen and (max-width: 745px)": {
            flexDirection: "column",
            padding: "0 16px 16px"
        }
    },
    button: {
        margin: "0 10px 0 0",
        "@media screen and (max-width: 745px)": {
            margin: "0 0 20px"
        }
    },
    link: {
        textDecoration: "none"
    },
    next: {
        gridArea: "next",
        justifySelf: "center"
    },
    arrow: {
        fontSize: "2.2em",
        borderRadius: "50%",
        padding: "3px",
        margin: "36px 0 0",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.08)"
        }
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
                                <CardContent className={classes.cardContent}>
                                    <h1 className={classes.header}>
                                        {restaurant.name}
                                    </h1>
                                    <p className={classes.subheader}>
                                        {restaurant.cuisines}
                                    </p>
                                    <p className={classes.paragraph}>
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
                                    <p className={classes.paragraph}>
                                        <span className={classes.label}>
                                            Average cost for two:{" "}
                                        </span>
                                        {restaurant.average_cost_for_two}
                                        {restaurant.currency}
                                    </p>
                                    <p className={classes.address}>
                                        <span className={classes.label}>
                                            Address:
                                        </span>
                                        <span>
                                            {restaurant.location.locality}
                                            <br />
                                            {restaurant.location.zipcode}
                                            <br />
                                            {restaurant.location.city}
                                        </span>
                                    </p>
                                </CardContent>
                            </div>
                            <div className={classes.gridButtons}>
                                <div className={classes.buttons}>
                                    <a className={classes.link} href={restaurant.menu_url} target="_blank" rel="noopener noreferrer">
                                        <Button
                                            variant="contained"
                                            className={classes.button}
                                            color="primary"
                                        >
                                            See menu
                                        </Button>
                                    </a>
                                    <a className={classes.link} href={restaurant.url} target="_blank" rel="noopener noreferrer">
                                        <Button
                                            variant="contained"
                                            className={classes.button}
                                            disabled={
                                                restaurant.has_table_booking
                                                    ? true
                                                    : false
                                            }
                                            color="primary"
                                        >
                                                Book a table
                                        </Button>
                                    </a>
                                </div>
                            </div>
                            <div className={classes.next}>
                                <ChevronRight
                                    className={classes.arrow}
                                    onClick={this.props.arrowOnClick}
                                />
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
    restaurant: PropTypes.object,
    arrowOnClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Restaurant);
