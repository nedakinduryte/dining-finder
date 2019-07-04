import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';



const mapStyles = {
	width: '100%',
	height: '100%',
};

class MapContainer extends React.Component {

	render() {
		const restaurants = this.props.restaurants;
		console.log(restaurants);

		return (
				<React.Fragment>
					{ restaurants.length > 0 &&
				    	<Map
				        	google={this.props.google}
				        	zoom={10}
				        	style={mapStyles}
				        	initialCenter={{ lat: restaurants[0].location.latitude, lng: restaurants[0].location.longitude }}
				    	>
				    		{ restaurants.map(restaurant => {
				    			return (
				    				<Marker
										name={ restaurant.name }
    									position={{ lat: restaurant.location.latitude, lng: restaurant.location.longitude }}
									/>
								)
				    		}) }
				    	</Map>
				    }
			    </React.Fragment>
	    );
  }
}


export default GoogleApiWrapper({
	apiKey: 'AIzaSyDPiXRQChLCChCAQT02pL5IRi3xo_iDhEM'
})(MapContainer);