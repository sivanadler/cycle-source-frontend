import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import wheelGif from './images/wheel-gif.gif'

import Nav from './components/Nav'
import Login from './components/Login'
import SignUp from './components/SignUp'
import HamburgerNav from  './components/HamburgerNav'
import SearchContainer from './components/SearchContainer'

class App extends Component {

  render() {
    return (
      <Router>
      <div className="App">
        {this.props.loggedIn ? <HamburgerNav /> : <Nav />}
        <span>
          <img className="wheel-gif" src={wheelGif} alt="spinny wheel" />
        </span>
        <span>
          <h1 className="logo">CYCLE SOURCE</h1>
        </span>
        {this.props.loginClicked ? <Login /> : null}
        {this.props.newUser ? <SignUp /> : null}
      </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginClicked: state.loginClicked,
    newUser: state.newUser,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(App);
