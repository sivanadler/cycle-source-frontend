import React from "react";
import { connect } from 'react-redux'
import LocationAdapter from '../apis/LocationAdapter'

class LocationsDiv extends React.Component {

  renderLocations = () => {
    return this.props.locations.map(location => {
      if (location.studio_id === this.props.studio_id) {
        return (
          <div className="locations-card">
            <h3>{location.name}</h3>
            <p>{location.address}</p>
            <p>{location.phone_number}</p>
            <p>{location.email}</p>
          </div>
        )
      }
    })
  }

  getLocations = () => {
    LocationAdapter.getLocations()
    .then(locations => {
      this.props.storeLocations(locations)
    })
  }

  render() {
    return (
      <div>
        <div className="locations-div">
          <h1 className="header">LOCATIONS</h1>
          {
            this.props.locations.length !== 0
            ?
            this.renderLocations()
            :
            this.getLocations()
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations,
    reviews: state.reviews
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    storeLocations: (array) => dispatch({ type: "GET_LOCATIONS", payload: array }),
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(LocationsDiv)
