import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Pin from './Pin'

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

class Map extends Component {

  static defaultProps = {
    center: {
      lat: 40.7527,
      lng: -73.9772
    },
    zoom: 14
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div id="map" >
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: key }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Pin
              lat={40.7527}
              lng={-73.9772}
              text= "MY MARKER"
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default Map;
