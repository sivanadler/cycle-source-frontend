import React, { Fragment }from "react"
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import search from '../images/search.png'
import calendar from '../images/calendar.png'
import logout from '../images/logout.png'
import avatar from '../images/avatar1.png'
import home from '../images/home.png'
import list from '../images/list.png'

class ExposedNav extends React.Component {
  logout = () => {
    let history = this.props.history
    localStorage.removeItem('jwt')
    localStorage.removeItem('jwtInstructor')
    history.push('/welcome')
    this.props.logOut()
  }

  render() {
    return (
      <div className='ham-modal'>
        <div className="exposed-hamburger" onClick={this.props.handleToggleHamburgerNav}>
          <div className="exposed-nav" ></div>
          <div className="exposed-nav" ></div>
          <div className="exposed-nav" ></div>
          <br/>
          <Router>
            {
              this.props.currentUser.role === "rider"
              ?
              <Fragment>
                <br/><br/><br/>
                <NavLink to="/home" exact className="nav-link" onClick={<Redirect to="/home" />}><img className="icon" src={home}/><p className="nav-link-text">Home</p></NavLink>
                <NavLink to="/search" exact className="nav-link" onClick={<Redirect to="/search" />}><img className="icon"src={search}/><p className="nav-link-text">Search</p></NavLink>
                <NavLink to="/reserve" exact className="nav-link" onClick={<Redirect to="/reserve" />}><img className="icon"src={calendar}/><p className="nav-link-text">Reserve</p></NavLink>
                <NavLink to="/profile" exact className="nav-link" onClick={<Redirect to="/profile" />}><img className="icon" src={avatar}/><p className="nav-link-text">My Profile</p></NavLink>
                <NavLink to="/welcome" exact className="nav-link" onClick={this.logout}><img className="icon" src={logout}/><p className="nav-link-text">Log Out</p></NavLink>
              </Fragment>
              :
              <Fragment>
              <br/><br/><br/>
              <NavLink to="/home" exact className="nav-link" onClick={<Redirect to="/home" />}><img className="icon" src={home}/><p className="nav-link-text">Home</p></NavLink>
              <NavLink to="/search" exact className="nav-link" onClick={<Redirect to="/search" />}><img className="icon"src={search}/><p className="nav-link-text">Search</p></NavLink>
              <NavLink to="/class_lists" exact className="nav-link" onClick={<Redirect to="/class_lists" />}><img className="icon" src={list}/><p className="nav-link-text">My Class Lists</p></NavLink>

              <NavLink to="/welcome" exact className="nav-link" onClick={this.logout}><img className="icon" src={logout}/><p className="nav-link-text">Log Out</p></NavLink>
              </Fragment>
            }
          </Router>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    logOut: () => dispatch({ type: "LOGOUT" }),
  }
}


export default connect(mapStateToProps, mapDispatchtoProps)(ExposedNav)
