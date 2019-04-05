import React from "react";
import { connect } from 'react-redux'

class Header extends React.Component {
  handletitle = () => {
    return (
      <h1 className="logged-in-header">Welcome, {this.props.currentUser.username} !</h1>
    )
  }

  componentDidMount(){
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      fetch("http://localhost:3000/api/v1/auto_login", {
        headers: {
          "Authorization": jwt
        }
      })
        .then(res => res.json())
        .then(response => {
          if (response.errors) {
            alert(response.errors)
          } else {
            this.props.setCurrentUser(response)
          }
        })
    }
  }

  render() {
    return (
      <div>
        {this.props.currentUser ? this.handletitle() : null}
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
  return{
    setCurrentUser: (user) => dispatch({ type: "SET_CURRENT_USER", payload: user}),

  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Header)
