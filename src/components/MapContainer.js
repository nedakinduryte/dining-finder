import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import PropTypes from "prop-types";

class MapContainer extends React.Component {
  onClick = name => {
    this.props.markerOnClick(name);
  };

  render() {
    const restaurants = this.props.restaurants;

    return (
      <React.Fragment>
        {restaurants.length > 0 && (
          <Map
            google={this.props.google}
			zoom={12}
			containerStyle={{ position: "relative" }}
            initialCenter={{
              lat: restaurants[0].location.latitude,
              lng: restaurants[0].location.longitude
			}}
			styles={[
				{
					"featureType": "administrative",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#444444"
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "all",
					"stylers": [
						{
							"color": "#f2f2f2"
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "all",
					"stylers": [
						{
							"saturation": -100
						},
						{
							"lightness": 45
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "simplified"
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "labels.icon",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "transit",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "all",
					"stylers": [
						{
							"color": "#ffffff"
						},
						{
							"visibility": "on"
						}
					]
				}
			]}
          >
            {restaurants.map(restaurant => {
              return (
                <Marker
                  key={restaurant.id}
                  title={restaurant.name}
                  name={restaurant.name}
                  position={{
                    lat: restaurant.location.latitude,
                    lng: restaurant.location.longitude
                  }}
                  onClick={e => this.onClick(restaurant.name)}
                />
              );
            })}
          </Map>
        )}
      </React.Fragment>
    );
  }
}

MapContainer.propTypes = {
	restaurants: PropTypes.array.isRequired,
	markerOnClick: PropTypes.func.isRequired
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDPiXRQChLCChCAQT02pL5IRi3xo_iDhEM"
})(MapContainer);
