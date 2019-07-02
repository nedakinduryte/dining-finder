import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';



const mapStyles = {
	width: '100%',
	height: '100%',
};

class MapContainer extends React.Component {

	render() {
		const restaurant = this.props.restaurant;
		console.log(restaurant.location.longitude);
		return (
				<React.Fragment>
					{ restaurant &&
				    	<Map
				        	google={this.props.google}
				        	zoom={10}
				        	style={mapStyles}
				        	initialCenter={{ lat: restaurant.location.latitude, lng: restaurant.location.longitude }}
				    	>
								<Marker
								name={ restaurant.name }
    							position={{ lat: restaurant.location.latitude, lng: restaurant.location.longitude }}
								/>
				    	</Map>
				    }
			    </React.Fragment>
	    );
  }
}


export default GoogleApiWrapper({
	apiKey: 'AIzaSyDPiXRQChLCChCAQT02pL5IRi3xo_iDhEM'
})(MapContainer);