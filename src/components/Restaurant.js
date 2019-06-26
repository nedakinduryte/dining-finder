import React from 'react';
import queryString from 'query-string';


class Restaurant extends React.Component {
	state = {
    	restaurants: []
  	}  	

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


export default Restaurant;