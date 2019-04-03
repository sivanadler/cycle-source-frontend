import React from "react"
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


const ProfileNav = (props) => {

  function handleMyReservations(){
    props.renderMyReservations()
  }

  function handleMyFavorites(){
    props.renderMyFavorites()
  }

  return (
    <div className="nav">
      <Router>
      <NavLink to="/profile/reservations" exact className="nav-link" onClick={handleMyReservations}>My Reservations</NavLink>
      <NavLink to="/profile/favorites" exact className="nav-link" onClick={handleMyFavorites}>My Favorites</NavLink>
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
