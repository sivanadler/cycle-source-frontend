import React from "react";
import { connect } from 'react-redux'
import ActiveStorageProvider from 'react-activestorage-provider'
import { DirectUploadProvider } from 'react-activestorage-provider'

class RiderForm extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
    photo: null
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
      name: this.state.name,
      city: "New York City",
      role: "rider",
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
      let history = this.props.history.history
      history.push('/home')
      this.props.setCurrentUser(json.user)
    })
  }

  render() {
    return (
      <div>
        <h1>Rider Form</h1>
        <form className="rider-sign-up" onSubmit={this.handleSubmit}>
          <label for="name">Full Name: </label><br/>
          <input type="text" name="name" value={this.state.name} onChange={this.handleOnChange}/><br/><br/>

          <label for="username">Username: </label><br/>
          <input type="text" name="username" value={this.state.username} onChange={this.handleOnChange}/><br/><br/>

          <label for="password">Password: </label><br/>
          <input type="password" name="password" value={this.state.password} onChange={this.handleOnChange}/><br/><br/>

          <ActiveStorageProvider
            endpoint={{
            path: `api/vi/users`,
            model: 'User',
            host: 'localhost:3000',
            method: 'POST'
            }}
          onSubmit={user => this.setState({ photo: user.photo })}
          render={({ handleUpload, uploads, ready }) => (
            <div>
              <input
                type="file"
                disabled={!ready}
                onChange={e => handleUpload(e.currentTarget.files)}
              />

              {uploads.map(upload => {
                switch (upload.state) {
                  case 'waiting':
                    return <p key={upload.id}>Waiting to upload {upload.file.name}</p>
                  case 'uploading':
                    return (
                      <p key={upload.id}>
                        Uploading {upload.file.name}: {upload.progress}%
                      </p>
                    )
                  case 'error':
                    return (
                      <p key={upload.id}>
                        Error uploading {upload.file.name}: {upload.error}
                      </p>
                    )
                  case 'finished':
                    return (
                      <p key={upload.id}>Finished uploading {upload.file.name}</p>
                    )
                }
              })}
            </div>
          )}
          />
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
