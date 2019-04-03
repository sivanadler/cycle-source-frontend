import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Pin from './Pin'

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

class Map extends Component {
  state = {
    lat: null,
    lng: null,
  }

  static defaultProps = {
    center: {
      lat: 40.7527,
      lng: -73.9772
    },
    zoom: 14
  };

  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude, lng: position.coords.longitude});
      },
      error => console.log(error)
    );
  }

  render() {
    const lat = this.state.lat
    const lng = this.state.lng
    return (
      // Important! Always set the container height explicitly
      <div id="map" >
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: key }}
            defaultCenter={{lat, lng}}
            defaultZoom={this.props.zoom}
          >
            <Pin
              lat={this.state.lat}
              lng={this.state.lng}
              text= "MY MARKER"
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default Map;
