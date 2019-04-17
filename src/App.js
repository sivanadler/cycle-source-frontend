import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import cycle from './images/cycle.png'

import Nav from './components/Nav'
import Login from './components/Login'
import SignUp from './components/SignUp'
import HamburgerNav from  './components/HamburgerNav'
import SearchContainer from './components/SearchContainer'
import UserAdapter from './apis/UserAdapter'

class App extends Component {

  componentDidMount(){
    UserAdapter.getUsers()
    .then(users => {
      this.props.storeUsers(users)
    })
  }

  render() {
    return (

      <div  className="login-background">
        {this.props.currentUser ? <Redirect to='/home' /> : <Nav />}
        <div className="logo-login-div">
          <h1 className="logo-login">CYCLE S<img className="wheelGif" src={cycle}/>URCE</h1>
          <p className="logo-login-small">find your ride</p>
        </div>
        {this.props.loginClicked ? this.props.history.push("/login") : null}
        {this.props.newUser ? this.props.history.push("/signup") : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loginClicked: state.loginClicked,
    newUser: state.newUser,
    loggedIn: state.loggedIn,
    currentUser: state.currentUser
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    storeUsers: (users) => dispatch ({ type: "STORE_USERS", payload: users}),
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(App);
