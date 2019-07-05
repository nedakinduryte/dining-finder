import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';



const mapStyles = {
	width: '100%',
	height: '100%',
};

class MapContainer extends React.Component {

	onClick = name => {
		this.props.markerOnClick(name);
	};

	render() {
		const restaurants = this.props.restaurants;

		return (
				<React.Fragment>
					{ restaurants.length > 0 &&
				    	<Map
				        	google={this.props.google}
				        	zoom={15}
				        	style={mapStyles}
				        	initialCenter={{ lat: restaurants[0].location.latitude, lng: restaurants[0].location.longitude }}
				    	>
				    		{ restaurants.map(restaurant => {
				    			return (
				    				<Marker
				    					key={ restaurant.id }
				    					title={ restaurant.name }
										name={ restaurant.name }
    									position={{ lat: restaurant.location.latitude, lng: restaurant.location.longitude }}
    									onClick={ (e) => this.onClick(restaurant.name) }
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