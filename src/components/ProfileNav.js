import React from "react"
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import reserve from '../images/reserve.png'
import star from '../images/star.png'

const ProfileNav = (props) => {

  function handleMyReservations(){
    props.renderMyReservations()
  }

  function handleMyFavorites(){
    props.renderMyFavorites()
  }

  return (
    <div className="profile-nav">
      <Router>
      <NavLink to="/profile/reservations" exact className="prof-nav-link" onClick={handleMyReservations}><img className="star-icon" src={reserve} alt="reserve"/><p className="nav-link-text">MY RESERVATIONS</p></NavLink>
      <NavLink to="/profile/favorites" exact className="prof-nav-link" onClick={handleMyFavorites}><img className="star-icon" src={star} alt="reserve"/><p className="nav-link-text">MY FAVORITES</p></NavLink>
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    myReservations: state.myReservations,
    myFavorites: state.myFavorites,
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    renderMyReservations: () => dispatch({ type: "RENDER_USERS_RESERVATIONS" }),
    renderMyFavorites: () => dispatch({ type: "RENDER_USERS_FAVORITES"})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(ProfileNav)
