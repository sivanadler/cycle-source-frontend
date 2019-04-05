import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Pin from './Pin'
import { connect } from 'react-redux'
import LocationAdapter from '../apis/LocationAdapter'

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
let latPin
let lngPin
let coordinatesArray = []

class Map extends Component {
  state = {
    lat: null,
    lng: null,
    coordinates: [],
    filteredCoordinates: []
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


  //right now, pins are all rendering
  renderPins = (locations) => {
    locations.forEach(location => this.getGeoCode(location.address))
  }
  //
  // handleFilteringPins = () => {
  //   debugger
  //     this.props.filteredLocations.forEach(location => this.getGeoFilteredCodes(location.address))
  // }

  getGeoCode = (address) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)
    .then(res => res.json())
    .then(res => {
      latPin = res.results[0].geometry.location.lat
      lngPin = res.results[0].geometry.location.lng
      this.props.setCoordinates({latPin, lngPin})
      // this.setState({
      //   coordinates: [...this.state.coordinates, {latPin, lngPin}],
      //   filteredCoordinates: []
      // })
    })
  }

  // getGeoFilteredCodes = (address) => {
  //   fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)
  //   .then(res => res.json())
  //   .then(res => {
  //     debugger
  //     latPin = res.results[0].geometry.location.lat
  //     lngPin = res.results[0].geometry.location.lng
  //     this.props.setFilteredCoordinate({latPin, lngPin})
  //     // this.setState({
  //     //   filteredCoordinates: [...this.state.filteredCoordinates, {latPin, lngPin}],
  //     //   coordinates: []
  //     // })
  //   })
  // }

  componentDidMount(){
    LocationAdapter.getLocations()
    .then(locations => {
      this.renderPins(locations)
    })
  }

  render() {
    console.log("map", this.props);
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
            {
              this.props.coordinates.length !== 0
              ?
              this.props.coordinates.map(coordinate =>{
                return <Pin lat={coordinate.latPin} lng={coordinate.lngPin} text= "MY MARKER"/>
              })
              :
              null
            }
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations,
    searchTerm: state.searchTerm,
    filteredLocations: state.filteredLocations,
    coordinates: state.coordinates,
    filteredCoordinates: state.filteredCoordinates
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    setCoordinates: (coordinates) => dispatch({ type: "SET_COORDINATES", payload: coordinates }),
    setFilteredCoordinate: (coordinates) => dispatch({ type: "SET_FILTERED_COORDINATES", payload: coordinates})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Map);
