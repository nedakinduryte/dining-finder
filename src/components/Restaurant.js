import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { withStyles, createStyles } from '@material-ui/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({});

const styles = createStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  }
}));

class Restaurant extends React.Component {

	render() {
		const restaurant = this.props.restaurant;
		const classes = this.props.classes;

		if (restaurant) {
			return(
				<ThemeProvider theme={ theme }>
						<Card className={ classes.card }>
			      			<CardMedia
						        className={ classes.media }
						        image={ restaurant.thumb }
						        title={ restaurant.name }
			      			/>
			      			<CardContent>
			        			<h1>{ restaurant.name }</h1>
								<p>{ restaurant.cuisines } Cuisine</p>
								<p>User rating: {" "}
									<span style={{ color:`#${restaurant.user_rating.rating_color}` }}>
										{ restaurant.user_rating.rating_text } ({ restaurant.user_rating.aggregate_rating } / 5)
									</span>
								</p>
								<a href={ restaurant.menu_url }>Menu</a>
								
								<p>Average cost for two: { restaurant.average_cost_for_two }{ restaurant.currency }</p>
								<p>Address:<br/>
									{ restaurant.location.locality }<br/>
									{ restaurant.location.zipcode }<br/>
									{ restaurant.location.city }
								</p>
			      			</CardContent>
			      			<a href={ restaurant.url }><button>Book a table</button></a>
							<button>Get directions</button>
		    			</Card>
		    	</ThemeProvider>
	  		)
		} else {
			return <div />;
		}
	}
}


export default withStyles(styles)(Restaurant);