import React from "react"
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

class ExposedNav extends React.Component {
  logout = () => {
    debugger
    localStorage.removeItem('jwt')
    this.props.logOut()
  }
  render() {
    return (
      <div className="">
        <div className="exposed-hamburger" onClick={this.props.handleToggleHamburgerNav}>
          <div className="exposed-nav" ></div>
          <div className="exposed-nav" ></div>
          <div className="exposed-nav" ></div>
          <br/>
          <Router>
            <NavLink to="/home" exact className="nav-link" onClick={<Redirect to="/home" />}>Home</NavLink><br/>
            <NavLink to="/search" exact className="nav-link" onClick={<Redirect to="/search" />}>Search</NavLink><br/>
            <NavLink to="/reserve" exact className="nav-link" onClick={<Redirect to="/reserve" />}>Reserve</NavLink><br/>
            <NavLink to="/profile" exact className="nav-link" onClick={<Redirect to="/profile" />}>My Profile</NavLink><br/>

            <NavLink to="/" exact className="nav-link" onClick={this.logout}>Log Out</NavLink><br/>
          </Router>
        </div>
      </div>
    )
  }
}
const mapDispatchtoProps = dispatch => {
  return {
    logOut: () => dispatch({ type: "LOGOUT" }),

  }
}


export default connect(null, mapDispatchtoProps)(ExposedNav)
