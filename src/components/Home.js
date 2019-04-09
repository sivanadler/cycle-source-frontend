import React from "react"
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import wheelGif from '../images/wheel-gif.gif'
import HamburgerNav from  './HamburgerNav'
import Header from './Header'


class Home extends React.Component {

  render() {
    console.log("am i logged in", this.props);
    return (
      <div className="">
        <span>
          <HamburgerNav />
        </span>
        <span>
          <Header />
        </span>
        <span>
          <img className="wheel-gif" src={wheelGif} alt="spinny wheel" />
        </span>
        <span>
          <h1 className="logo">CYCLE SOURCE</h1>
        </span>
      </div>
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
