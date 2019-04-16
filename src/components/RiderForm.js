import React from "react";
import { connect } from 'react-redux'
import ActiveStorageProvider from 'react-activestorage-provider'
import { DirectUploadProvider } from 'react-activestorage-provider'
import upload from '../images/upload.png'
import UserAdapter from '../apis/UserAdapter'

class RiderForm extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
    selectedFile: null,
    profile_pic: "",
    city: "New York City",
    role: "rider",
    notFilledOut: false,
    users: [],
    invalidUsername: false
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.name === "" || this.state.username === "" || this.state.password === "" || this.state.selectedFile === "") {
      this.setState({
        notFilledOut: true
      })
    } else {
      let usernames = []
      this.state.users.map(user => {
        usernames.push(user.username)
      })
      if (usernames.includes(this.state.username)) {
        this.setState({
          invalidUsername: true
        })
      } else {
        const formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('username', this.state.username)
        formData.append('password', this.state.password)
        formData.append('photo', this.state.selectedFile)
        formData.append('profile_pic', this.state.profile_pic)
        formData.append('city', this.state.city)
        formData.append('role', this.state.role)
          console.log(formData);
        fetch("http://localhost:3000/api/v1/users", {
    			method: "POST",
    			body: formData
    		})
        .then(res => res.json())
        .then(json => {
          localStorage.setItem('jwt', json.jwt)
          this.props.history.push('/home')
          this.props.setCurrentUser(json.user)
        })
      }
    }
  }

  fileSelectedHandler = (e) => {
    this.setState({
      selectedFile: e.target.files[0]
    })
  }

  componentDidMount(){
    UserAdapter.getUsers()
    .then(users => {
      this.setState({ users })
    })
  }

  render() {
    return (
      <div>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <h1 className="login-header">SIGN UP</h1>
          {this.state.notFilledOut ? <p className="invalid-text">These Fields Are All Required. Please Try Again. </p> : null}
          <input className="login-input" type="text" name="name" value={this.state.name} onChange={this.handleOnChange} placeholder="Full Name"/><br/><br/>

          {this.state.invalidUsername ? <p className="invalid-text">This Username is Already Taken. Please Try Again. </p> : null}

          <input className="login-input" type="text" name="username" value={this.state.username} onChange={this.handleOnChange} placeholder="Username"/><br/><br/>

          <input className="login-input" type="password" name="password" value={this.state.password} onChange={this.handleOnChange} placeholder="Password"/><br/><br/>
          <div className="input-file-container">
            <input className="input-file" type="file" onChange={this.fileSelectedHandler}/>
          </div><br/><br/>
          <input className="login-btn" type="submit" value="Create Account" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    users: state.users
  }
}


const mapDispatchtoProps = dispatch => {
  return {
    addNewUser: () => dispatch({ type: "ADD_NEW_USER" }),
    setCurrentUser: (user) => dispatch({ type: "SET_CURRENT_USER", payload: user})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(RiderForm)



//
// <ActiveStorageProvider
//   endpoint={{
//   path: `api/vi/users`,
//   model: 'User',
//   host: 'localhost:3000',
//   method: 'POST'
//   }}
// onSubmit={user => this.setState({ photo: user.photo })}
// render={({ handleUpload, uploads, ready }) => (
//   <div>
//     <input
//       type="file"
//       disabled={!ready}
//       onChange={e => handleUpload(e.currentTarget.files)}
//     />
//
//     {uploads.map(upload => {
//       switch (upload.state) {
//         case 'waiting':
//           return <p key={upload.id}>Waiting to upload {upload.file.name}</p>
//         case 'uploading':
//           return (
//             <p key={upload.id}>
//               Uploading {upload.file.name}: {upload.progress}%
//             </p>
//           )
//         case 'error':
//           return (
//             <p key={upload.id}>
//               Error uploading {upload.file.name}: {upload.error}
//             </p>
//           )
//         case 'finished':
//           return (
//             <p key={upload.id}>Finished uploading {upload.file.name}</p>
//           )
//       }
//     })}
//   </div>
// )}
// />
