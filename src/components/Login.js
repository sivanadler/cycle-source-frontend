import React from "react"
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import wheelGif from '../images/wheel-gif.gif'
import Nav from './Nav'

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    checkedRider: false,
    checkedInstructor: false,
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.checkedInstructor) {
      this.handleInstructorLogIn()
    } else {
      fetch("http://localhost:3000/api/v1/login", {
  			method: "POST",
  			headers: {
  				"Content-Type": "application/json",
  				"Accepts": "application/json",
  			},
  			body: JSON.stringify(this.state)
  		})
  		.then(res => res.json())
  		.then(response => {
        if (response.user && this.state.checkedRider && response.user.user.role === 'rider') {
          localStorage.setItem('jwt', response.jwt)
          this.props.history.push('/home')
        }})
    }
  }

  handleInstructorLogIn = () => {
    fetch("http://localhost:3000/api/v1/instructor_login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then(response => {
      localStorage.setItem('jwtInstructor', response.jwt)
      if (localStorage.getItem('jwtInstructor')) {
        this.props.history.push('/home')
        this.props.setCurrentUser(response.instructor.instructor)
        this.props.history.push('/home')
      } else if (this.state.checkedRider){
        alert("Looks like you're not an Rider... Please log in with the correct account type!")
      }})
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnCheck = e => {
    if (e.target.value === "Instructor") {
      this.setState({
        checkedInstructor: true,
        checkedRider: false
      })
    } else {
      this.setState({
        checkedInstructor: false,
        checkedRider: true
      })
    }
  }

  render() {
    return (
      <div>
        <Nav history={this.props.history}/>
        <div>
          <span>
            <h1 className="logo">CYCLE SOURCE</h1>
          </span>
          <span>
            <img className="wheel-gif" src={wheelGif} alt="spinny wheel" />
          </span>
          <form onSubmit={this.handleSubmit}>
          <div className="radio">
            <h1>Log In</h1>
            <h3>Please Check Off Your Account Type: </h3>
            <label>
              <input type="radio" name="rider" value="Rider" checked={this.state.checkedRider} onChange={this.handleOnCheck}/>
              Rider
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="Instructor" checked={this.state.checkedInstructor} onChange={this.handleOnCheck}/>
              Instructor
            </label>
          </div>
            <label>Username: </label>
            <input type="text" name="username" onChange={this.handleOnChange} value={this.state.username}/> <br/>
            <label>Password: </label>
            <input type="password" name="password" onChange={this.handleOnChange} value={this.state.password}/> <br/>
            <input type="submit" name="submit" value="Log In" />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    users: state.users,
  }
}


const mapDispatchtoProps = dispatch => {
  return {
    logUserIn: () => dispatch({ type: "LOG_USER_IN" }),
    setCurrentUser: (user) => dispatch({ type: "SET_CURRENT_USER", payload: user}),
    something: () => dispatch({type: "NEW_USER"})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Login)
