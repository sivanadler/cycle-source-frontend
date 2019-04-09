import React from "react"
import { connect } from 'react-redux'



class ProfileInformation extends React.Component {
  state = {
    name: null,
    username: null,
    profile_pic: null
  }

  returnUserInfo = () => {
    console.log(this.props.currentUser);
    return(
      <div className="profile-information">
        <img className="profile-picture" src={this.props.currentUser.imageUrl} alt="photo" />
        <h1>{this.props.currentUser.name} </h1>
        <h1>{this.props.currentUser.username}</h1>
      </div>
    )
  }
  render() {
    const formData = new FormData();
      formData.append('name', this.state.name)
      formData.append('username', this.state.username)
      formData.append('profile_pic', this.state.profile_pic)
    return (
      <div className="profile-information">
        {this.props.currentUser ? this.returnUserInfo() : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(ProfileInformation)
