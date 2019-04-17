import React from "react"
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import wheelGif from '../images/wheel-gif.gif'
import spin from '../images/spin.jpg'

import HamburgerNav from  './HamburgerNav'
import Header from './Header'


class Home extends React.Component {

  render() {
    return (
      <span>
        <HamburgerNav />
        <Header history={this.props.history} />
        <br/>
        <div className="home">
          <span className="home-header">
          </span>
          <span className="home-header">
          </span>
          <h1 className="home-logo">CYCLE SOURCE</h1>
          <p className="home-logo-small">find your ride.</p>
        </div>
      </span>
    )
  }
}

const mapStateToProps = state => {
  return {
    loginClicked: state.loginClicked,
    newUser: state.newUser,
    loggedIn: state.loggedIn,
    currentUser: state.currentUser,
    users: state.users
  }
}

const mapDispatchtoProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Home);
