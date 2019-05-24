import React from "react"
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import wheelGif from '../images/wheel-gif.gif'
import spin from '../images/spin.jpg'
import logo from '../images/logo.png'
import HamburgerNav from  './HamburgerNav'
import Header from './Header'

//User is directed to this component once logged in or signed up, home page. 

class Home extends React.Component {

  render() {
    return (
      <span>
        <div className="top">
          <HamburgerNav />
          <Header history={this.props.history} />
        </div>
        <br/>
        <div className="home">
          <span className="home-header">
          </span>
          <span className="home-header">
          </span>
          <div className="logo-login-div">
            <img className="wheelGif" src={logo}/>
          </div>
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
