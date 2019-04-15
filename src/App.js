import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import wheelGif from './images/wheel-gif.gif'

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

      <div className="App">
        {this.props.currentUser ? <Redirect to='/home' /> : <Nav />}
        <span>
          <img className="wheel-gif" src={wheelGif} alt="spinny wheel" />
        </span>
        <span>
          <h1 className="logo">CYCLE</h1>
          <h1 className="logo">SOURCE</h1>
        </span>
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
