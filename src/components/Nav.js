import React from "react"
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import '../App.css';
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'

const Nav = (props) => {

  function handleLogin(){
    props.toggleLogin()
  }

  function handleSignUp(){
    props.newUser()
  }

  console.log(props.loginClicked);
  return (
  <div className="nav">
    <Router>
    <NavLink to="/login" exact className="nav-link" onClick={handleLogin}>Log In</NavLink>
    <NavLink to="/signup" exact className="nav-link" onClick={handleSignUp}>Sign Up</NavLink>
    </Router>
  </div>
  )
}

const mapStateToProps = state => {
  return {
    loginClicked: state.loginClicked
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    toggleLogin: () => dispatch({ type: "SHOW_LOGIN_FORM" }),
    newUser: () => dispatch({ type: "NEW_USER" })
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Nav)
