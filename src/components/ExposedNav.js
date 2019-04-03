import React from "react"
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Redirect } from 'react-router'

const ExposedNav = (props) => {
  return (
  <div className="">
    <div className="exposed-hamburger" onClick={props.handleToggleHamburgerNav}>
      <div className="exposed-nav" ></div>
      <div className="exposed-nav" ></div>
      <div className="exposed-nav" ></div>
      <br/>
      <Router>
        <NavLink to="/" exact className="nav-link" onClick={<Redirect to="/" />}>Home</NavLink><br/>
        <NavLink to="/search" exact className="nav-link" onClick={<Redirect to="/search" />}>Search</NavLink><br/>
        <NavLink to="/reserve" exact className="nav-link" onClick={<Redirect to="/reserve" />}>Reserve</NavLink><br/>
        <NavLink to="/profile" exact className="nav-link" onClick={<Redirect to="/profile" />}>My Profile</NavLink><br/>
      </Router>
    </div>
  </div>
  )
}

export default ExposedNav
