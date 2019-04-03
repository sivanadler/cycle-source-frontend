import React from "react"
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

const ExposedNav = (props) => {
  return (
  <div className="">
    <div className="exposed-hamburger" onClick={props.handleToggleHamburgerNav}>
      <div className="exposed-nav" ></div>
      <div className="exposed-nav" ></div>
      <div className="exposed-nav" ></div>
      <br/>
      <Router>
        <NavLink to="/" exact className="nav-link" onClick={null}>Home</NavLink><br/>
        <NavLink to="/search" exact className="nav-link" onClick={null}>Search</NavLink><br/>
        <NavLink to="/reserve" exact className="nav-link" onClick={null}>Reserve</NavLink><br/>
        <NavLink to="/profile" exact className="nav-link" onClick={null}>My Profile</NavLink><br/>
      </Router>
    </div>
  </div>
  )
}

export default ExposedNav
