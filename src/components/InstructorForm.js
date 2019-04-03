import React from "react"

class InstructorForm extends React.Component {
  state = {
    first_name: '',
    last_name: '',
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

  render() {
    return (
      <div>
        <h1>Instructor Form</h1>
        <form className="instructor-sign-up">
          <label for="first_name">First Name: </label><br/>
          <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleFormChange}/><br/><br/>

          <label for="last_name">Last Name: </label><br/>
          <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleFormChange}/><br/><br/>

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
export default InstructorForm
