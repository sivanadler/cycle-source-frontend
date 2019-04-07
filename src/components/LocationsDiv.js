import React from "react";
import { connect } from 'react-redux'

class Locations extends React.Component {

  render() {
    return (
      <div>
        <div className="locations-div">
          <h1 className="header">LOCATIONS</h1>
          {this.props.locations.map(location => {
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
          })}
        </div>
        <div className="reviews-div">
          <h1 className="header">REVIEWS</h1>
          {this.props.locations.map(location => {
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
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations
  }
}
export default connect(mapStateToProps)(Locations)
