import React from 'react';
//import queryString from 'query-string';
import Location from './Location';
import Cuisine from './Cuisine';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';


const styles = {
  	button: {
    	margin: '20px',
  	},
  	input: {
    	display: 'none',
  	},
};

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			locationId: null,
			cuisineId: null
		};
	};

	handleLocationSelection = locationId => { 
		this.setState({ locationId });
	};

	handleCuisineSelection = cuisineId => this.setState({ cuisineId });

	//handleSubmit = e => {
		//e.preventDefault();
		//const location = e.target.location.value;
		//const query = queryString.stringify({ location: location });
		//this.props.history.push(`/restaurants?${ query }`);
	//}

	render() {
		const classes = this.props.classes;
		return (
			<React.Fragment>
				<Location 
					handleLocationSelection={this.handleLocationSelection}
				/>
				<Cuisine
					locationId={this.state.locationId}
					handleCuisineSelection={this.handleCuisineSelection}
				/>
				<Button variant="contained" className={classes.button}>
			        Search
			    </Button>
			</React.Fragment>
		)
	}
}


export default withStyles (styles)(Search);