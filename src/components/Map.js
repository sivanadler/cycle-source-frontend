import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Pin from './Pin'
import { connect } from 'react-redux'

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
let lat
let lng

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
  initGeocoder = ({ maps }) => {
    const Geocoder = new maps.Geocoder();
  };

  componentDidMount(){
    let addressToGeocode = this.props.locations[0].address
    console.log(addressToGeocode);
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressToGeocode}&key=${key}`)
    .then(res => res.json())
    .then(res => {
      lat = res.results[0].geometry.location.lat
      lng = res.results[0].geometry.location.lng
      return <Pin
        lat={lat}
        lng={lng}
        text= "NEW"
      />
    })
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
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations,
  }
}

export default connect(mapStateToProps)(Map);
