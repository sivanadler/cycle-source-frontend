import React from "react"
import { connect } from 'react-redux'

const ProfileInformation = (props) => {
  function returnUserInfo(){
    debugger
    console.log(props.currentUser);
    return(
      <div className="profile-information">
        <img className="profile-picture" src={props.currentUser.profile_pic} alt="photo" />
        <h1>{props.currentUser.name} </h1>
        <h1>{props.currentUser.username}</h1>
      </div>
    )
  }

  return (
    <div className="profile-information">
      {props.currentUser ? returnUserInfo() : null}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(ProfileInformation)
