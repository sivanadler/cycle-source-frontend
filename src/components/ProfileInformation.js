import React from "react"
import { connect } from 'react-redux'



class ProfileInformation extends React.Component {
  state = {
    name: null,
    username: null,
    profile_pic: null
  }

  returnUserInfo = () => {
    return(
      <div>
        <img className="profile-picture" src={this.props.currentUser.imageUrl} alt="photo" />
        <h3 className="profile-details-text strong">NAME:</h3>
        <p className="profile-details-text">{this.props.currentUser.name} </p>
        <br/>
        <h3 className="profile-details-text strong">USERNAME:</h3>
        <p className="profile-details-text" >{this.props.currentUser.username}</p>
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
