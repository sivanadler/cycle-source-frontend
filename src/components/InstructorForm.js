import React from "react"
import { connect } from 'react-redux'

class InstructorForm extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
    hometown: '',
    fun_fact: '',
    studios: [],
    teaching_style: null
  }

  handleFormChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      })
  }

  handleStudioCheckBox = e => {
    if (e.target.checked){
      this.setState({
        studios: [...this.state.studios, e.target.name]
      })
    }
    else {
      let studios = this.state.studios.filter(studio => studio !== e.target.name)
      this.setState({
        studios
      })
    }
  }

  handleTeachingStyle = e => {
    this.setState({
      teaching_style: e.target.value
    })
  }

  //creating an instructor isnt working...
  handleSubmit = e => {
    e.preventDefault()
    let data = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      hometown: this.state.hometown,
      fun_fact: this.state.fun_fact,
      teaching_style: this.state.teaching_style,
      role: "instructor"
    }
    fetch("http://localhost:3000/api/v1/instructors", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify({user: data})
		})
    .then(res => res.json())
    .then(json => {
      localStorage.setItem('jwtInstructor', json.jwt)
      let history = this.props.history.history
      history.push('/home')
      this.props.setCurrentUser(json.user)
    })
  }

  render() {
    return (
      <div>
        <h1>Instructor Form</h1>
        <form className="instructor-sign-up" onSubmit={this.handleSubmit}>
          <label for="first_name">Full Name: </label><br/>
          <input type="text" name="name" value={this.state.name} onChange={this.handleFormChange}/><br/><br/>

          <label for="username">Username: </label><br/>
          <input type="text" name="username" value={this.state.username} onChange={this.handleFormChange}/><br/><br/>

          <label for="password">Password: </label><br/>
          <input type="password" name="password" value={this.state.password} onChange={this.handleFormChange}/><br/><br/>

          <h4>Select The Studios You Teach At: </h4>
            <div>
              <input type="checkbox" id="FlyWheel" name="FlyWheel" onChange={this.handleStudioCheckBox}/>
              <label for="FlyWheel">FlyWheel</label>
            </div>
            <div>
              <input type="checkbox" id="SoulCycle" name="SoulCycle" onChange={this.handleStudioCheckBox}/>
              <label for="SoulCycle">SoulCycle</label>
            </div><br/>

          <h4>Some Details for your Profile: </h4>
            <label for="hometown">Hometown: </label><br/>
            <input type="hometown" name="hometown" value={this.state.hometown} onChange={this.handleFormChange}/><br/><br/>

            <label for="fun_fact">Fun Fact: </label><br/>
            <input type="fun_fact" name="fun_fact" value={this.state.fun_fact} onChange={this.handleFormChange}/><br/><br/>

            <select onChange={this.handleTeachingStyle}>
              <option value="" selected disabled hidden>Select Your Teaching Style</option>
              <option value="team_captain">The Team Captain</option>
              <option value="entertainer">The Entertainer</option>
              <option value="power_house">The Powerhouse</option>
              <option value="rebel">The Rebel</option>
              <option value="visionary">The Visionary</option>
            </select><br/><br/>

          <input type="submit" value="Create Account"/>
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

export default connect(mapStateToProps, mapDispatchtoProps)(InstructorForm)
