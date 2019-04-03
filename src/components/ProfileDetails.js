import React from "react"
import ProfileNav from './ProfileNav'

import { connect } from 'react-redux'

const ProfileDetails = (props) => {
  return (
  <div className="profile-details-container">
    <ProfileNav />
    {props.myReservations
      ?
      <h1>My Reservations </h1>
      :
      null
    }
    {props.myFavorites
      ?
      <h1> My Favorites </h1>
      : null
    }
  </div>
  )
}

const mapStateToProps = state => {
  return {
    myReservations: state.myReservations,
    myFavorites: state.myFavorites,
  }
}

export default connect(mapStateToProps)(ProfileDetails)
