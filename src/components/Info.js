import React from 'react';
import queryString from 'query-string';


const API_KEY = "2d0e89daf27dd516eb7dcf5208bd83de";

class Info extends React.Component {
	state = {
    	restaurants: [],
    	location: undefined
  	}

  	componentDidMount() {
  		const values = queryString.parse(this.props.location.search);
  		this.setState({ location: values.location }, this.getRestaurants);
  	}

  	getRestaurants = async () => {
	    const api_call = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_type=city&q=${this.state.location}&count=10&sort=rating&order=desc`, {headers: {'Content-Type': 'application/json', "user-key": API_KEY}})
	    
	    const data = await api_call.json();
	    this.setState({ restaurants: data.restaurants })
	    // console.log(this.state.restaurants);
	 };

	selectRestaurant = () => {
		const restaurants = this.state.restaurants;
		if (restaurants.length > 0) {
			return restaurants[Math.floor(Math.random()*restaurants.length)].restaurant;
		} else {
			return undefined;
		}
	};

	render() {
		const restaurant = this.selectRestaurant();
		console.log(restaurant);

		return(
			<div>
				{ restaurant && (
					<React.Fragment>
						<img src={ restaurant.thumb } alt={ restaurant.name } />
						<h1>{ restaurant.name }</h1>
						<p>{ restaurant.cuisines } Cuisine</p>
						<p>User rating: {" "}
							<span style={{ color:`#${restaurant.user_rating.rating_color}` }}>
								{ restaurant.user_rating.rating_text } ({ restaurant.user_rating.aggregate_rating })
							</span>
						</p>
						<a href={ restaurant.menu_url }>Menu</a>
						<p>Price range: { restaurant.currency.repeat(restaurant.price_range) }</p>
						<p>Address:<br/>
							{ restaurant.location.locality }<br/>
							{ restaurant.location.zipcode }<br/>
							{ restaurant.location.city }
						</p>
						<a href={ restaurant.url }><button>Book a table</button></a>
						<button>Get directions</button>
					</React.Fragment>
				) }
			</div>
		)
	}
}


export default Info;