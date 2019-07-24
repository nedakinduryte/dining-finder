import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import PropTypes from "prop-types";

class MapContainer extends React.Component {

  render() {
    const restaurants = this.props.restaurants;

    return (
      <React.Fragment>
        {restaurants.length > 0 && (
          <Map
            google={this.props.google}
			zoom={12}
			containerStyle={{ position: "relative" }}
			center={{ lat: this.props.lat, lng: this.props.lng }}
            initialCenter={{
              lat: restaurants[0].location.latitude,
              lng: restaurants[0].location.longitude
			}}
          >
            {restaurants.map((restaurant, index) => {
              return (
                <Marker
                  key={restaurant.id}
                  title={restaurant.name}
				          name={restaurant.name}
				  position={{
                    lat: restaurant.location.latitude,
                    lng: restaurant.location.longitude
                  }}
				  onClick={e => this.props.markerOnClick(restaurant.id, index)}
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
	markerOnClick: PropTypes.func.isRequired,
	lat: PropTypes.string,
	lng: PropTypes.string
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDPiXRQChLCChCAQT02pL5IRi3xo_iDhEM"
})(MapContainer);
