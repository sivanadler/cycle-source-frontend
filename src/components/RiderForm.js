import React from "react";

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

  render() {
    return (
      <div>
        <h1>Rider Form</h1>
        <form className="rider-sign-up">
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
export default RiderForm
