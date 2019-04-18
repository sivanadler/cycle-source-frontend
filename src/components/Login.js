import React from "react"
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import wheelGif from '../images/wheel-gif.gif'
import username from '../images/username.png'
import UserAdapter from '../apis/UserAdapter'
import Nav from './Nav'

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    checkedRider: false,
    checkedInstructor: false,
    notFilledOut: false,
    notChecked: false,
    invalidRole: false,
    users: []
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.username === "" || this.state.password === "") {
      this.setState({
        notFilledOut: true
      })
    }
    if (!this.state.checkedRider && !this.state.checkedInstructor) {
      this.setState({
        notChecked: true
      })
    }
    if (this.state.checkedInstructor) {
      if (this.state.users.length !== 0) {
        let user = this.state.users.find(user => user.username === this.state.username)
        if (user && user.role === 'rider' && this.state.checkedInstructor) {
          this.setState({
            invalidRole: true
          })
        } else {
          this.handleInstructorLogIn()
        }
      }} else {
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

  componentDidMount(){
    UserAdapter.getUsers()
    .then(users => {
      this.setState({ users })
    })
  }

  render() {
    return (
      <div className="login-background">
        <Nav history={this.props.history}/>
        <div>
          <span>
            <h1 className="logo-login-white">CYCLE SOURCE</h1>
          </span>
          <div className="login-form">
            <form onSubmit={this.handleSubmit}>
              <h1 className="login-header">LOG IN</h1>
              <h3 className="login-subheader">Please Check Off Your Account Type: </h3>
              {this.state.notChecked ? <p className="invalid-text">This Field is Required. Please Select Your Account Type.</p> : null}
              {this.state.invalidRole ? <p className="invalid-text">Looks like you checked the wrong account type. Please select the correct account type to continue.</p> : null}
            <div className="radio">
              <label className="login-label">
                <input type="radio" name="rider" value="Rider" checked={this.state.checkedRider} onChange={this.handleOnCheck} class="option-input checkbox"/>
                Rider
              </label>
            </div>
            <div className="radio">
              <label className="login-label">
                <input type="radio" value="Instructor" checked={this.state.checkedInstructor} onChange={this.handleOnCheck} class="option-input checkbox"/>
                Instructor
              </label>
            </div>
              <br/><br/>
              {this.state.notFilledOut ? <p className="invalid-text">Invalid Username or Password. Please try again.</p> : null}
              <input type="text" name="username" onChange={this.handleOnChange} value={this.state.username} className="login-input" placeholder="Username"/> <br/>
              <input type="password" name="password" onChange={this.handleOnChange} value={this.state.password} className="login-input" placeholder="Password"/> <br/>
              <input type="submit" name="submit" value="Log In" className="login-btn"/>
            </form>
            <p className="modal-text">Don't Have An Account? <a className="link" href={'/signup'}>Create One Here!</a></p>
          </div>
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
