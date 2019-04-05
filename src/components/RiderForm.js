import React from "react";
import { connect } from 'react-redux'


class RiderForm extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    let data = {
      username: this.state.username,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      city: "New York City",
      role: "rider"
    }
    fetch("http://localhost:3000/api/v1/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify({user: data})
		})
    .then(res => res.json())
    .then(json => {
      localStorage.setItem('jwt', json.jwt)
      this.props.setCurrentUser(json.user)
    })
  }

  render() {
    return (
      <div>
        <h1>Rider Form</h1>
        <form className="rider-sign-up" onSubmit={this.handleSubmit}>
          <label for="first_name">First Name: </label><br/>
          <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleOnChange}/><br/><br/>

          <label for="last_name">Last Name: </label><br/>
          <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleOnChange}/><br/><br/>

          <label for="username">Username: </label><br/>
          <input type="text" name="username" value={this.state.username} onChange={this.handleOnChange}/><br/><br/>

          <label for="password">Password: </label><br/>
          <input type="password" name="password" value={this.state.password} onChange={this.handleOnChange}/><br/><br/>

          <input type="submit" value="Create Account" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
  }
}


const mapDispatchtoProps = dispatch => {
  return {
    addNewUser: () => dispatch({ type: "ADD_NEW_USER" }),
    setCurrentUser: (user) => dispatch({ type: "SET_CURRENT_USER", payload: user})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(RiderForm)
