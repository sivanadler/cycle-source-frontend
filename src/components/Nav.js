import React from "react"
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import '../App.css';
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'
import signup from '../images/signup.png'
import login from '../images/login.png'

const Nav = (props) => {

  function handleLogin(){
    props.history.push('/login')
    props.toggleLogin()
  }

  function handleSignUp(){
    props.history.push('/signup')
    props.newUser()
  }

  return (
  <div className="nav">
    <Router>
      <NavLink to="/login" exact className="main-nav-link" onClick={handleLogin}><img className="login-icon" src={login} alt="reserve"/><p className="main-nav-link-text"><strong>LOG IN</strong></p></NavLink>
      <NavLink to="/signup" exact className="main-nav-link" onClick={handleSignUp}><img className="login-icon" src={signup} alt="reserve"/><p className="main-nav-link-text"><strong>SIGN UP</strong></p></NavLink>
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
