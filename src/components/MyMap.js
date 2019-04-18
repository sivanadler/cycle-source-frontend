import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Map, GoogleApiWrapper, InfoWindow, Marker  } from 'google-maps-react';
import Pin from './Pin'
import { connect } from 'react-redux'
import LocationAdapter from '../apis/LocationAdapter'

 const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
let latPin
let lngPin
let coordinatesArray = []

 const mapStyles = {
  position: 'absolute',
  width: '47%',
  height: '80.5%',
  float: 'left',
  backgroundColor: 'white',
  margin: '25px',
  border: '10px solid white'
};

const markerStyle = {
}


var url

 class MyMap extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

   onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

   onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

   renderMarkers = () => {
    var url = {
      url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
    }
    if (this.props.coordinates.length !== 0) {
      return this.props.coordinates.map(coordinate => {
        latPin = coordinate.latPin
        lngPin = coordinate.lngPin
        let studio = this.props.studios.find(studio => studio.id === coordinate.location.studio_id)
        return (<Marker
          style={markerStyle}
          // icon={url}
          onClick={this.onMarkerClick}
          name={"something"}
          position = {{lat: latPin, lng: lngPin}}
          name = {<div><h1>{studio.name}</h1><h2>{coordinate.location.name}</h2><h3>{coordinate.location.address}</h3></div>}
        />
      )})
    }
  }

   renderFilteredMarkers = () => {
    if (this.props.filteredLocations.length !== 0) {
      this.props.filteredLocations.map(location => this.getGeoFilteredCodes(location))
    }
    if (this.props.filteredCoordinates.length !== 0) {
      return this.props.filteredCoordinates.map(coordinate => {
        latPin = coordinate.latPin
        lngPin = coordinate.lngPin
        let studio = this.props.studios.find(studio => studio.id === coordinate.location.studio_id)
        return (<Marker
          onClick={this.onMarkerClick}
          // icon={url}
          name={"something"}
          position = {{lat: latPin, lng: lngPin}}
          name = {<div><h1>{studio.name}</h1><h2>{coordinate.location.name}</h2><h3>{coordinate.location.address}</h3></div>}
        />
      )})
    }
  }

   putFilteredMarkersOnPage = () => {
    return this.props.filteredCoordinates.map(coordinate => {
      latPin = coordinate.latPin
      lngPin = coordinate.lngPin
      let studio = this.props.studios.find(studio => studio.id === coordinate.location.studio_id)
      return (<Marker
        // icon={url}
        onClick={this.onMarkerClick}
        name={"something"}
        position = {{lat: latPin, lng: lngPin}}
        name = {<div><h1>{studio.name}</h1><h2>{coordinate.location.name}</h2><h3>{coordinate.location.address}</h3></div>}
      />
    )})
  }

   getGeoCode = (location) => {
    let address = location.address
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)
    .then(res => res.json())
    .then(res => {
      latPin = res.results[0].geometry.location.lat
      lngPin = res.results[0].geometry.location.lng
      if (this.props.filteredCoordinates.length !== 0) {
        this.props.resetCoordinates({latPin, lngPin, location})
      } else {
        this.props.setCoordinates({latPin, lngPin, location})
      }
    })
    .then(res => {
      if (this.props.filteredLocations.length !== 0 && this.props.filteredCoordinates.length !== 0) {
      }
    })
  }

   getGeoFilteredCodes = (location) => {
    let address = location.address
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)
    .then(res => res.json())
    .then(res => {
      latPin = res.results[0].geometry.location.lat
      lngPin = res.results[0].geometry.location.lng
      this.props.setFilteredCoordinates({latPin, lngPin, location})
    })
  }

   getUnFilteredLocations = () => {
    if (this.props.filteredCoordinates.length !== 0) {
      this.props.resetSearchCleared()
      this.props.locations.map(location => this.getGeoCode(location))
    }
  }

   componentDidMount(){
    LocationAdapter.getLocations()
    .then(locations => {
      locations.map(location => this.getGeoCode(location))
    })
  }

   render() {
    return (
      <div id="map">
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
           lat: 40.7527,
           lng: -73.9772
          }}
        >
        {this.props.locations.length !== 0 ? this.renderMarkers() : null}

         {this.props.filteredLocations.length !== 0 ? this.renderFilteredMarkers() : null}

         {this.props.filteredCoordinates.length !== 0 ? this.putFilteredMarkersOnPage() : null}

         {this.props.searchCleared ? this.getUnFilteredLocations() : null}

           <InfoWindow
             marker={this.state.activeMarker}
             visible={this.state.showingInfoWindow}
             onClose={this.onClose}
           >
               <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
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
    filteredCoordinates: state.filteredCoordinates,
    studios: state.studios,
    searchCleared: state.searchCleared
  }
}

 const mapDispatchtoProps = dispatch => {
  return {
    setCoordinates: (coordinates) => dispatch({ type: "SET_COORDINATES", payload: coordinates }),
    setFilteredCoordinates: (coordinates) => dispatch({ type: "SET_FILTERED_COORDINATES", payload: coordinates}),
    resetCoordinates: (coordinates => dispatch({ type: "RESET_COORDINATES", payload: coordinates})),
    resetSearchCleared: () => dispatch({ type: "RESET_SEARCH_CLEARED"})
  }
}


 export default GoogleApiWrapper({
  apiKey: key
})(connect(mapStateToProps, mapDispatchtoProps)(MyMap));
