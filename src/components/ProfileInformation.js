import React from "react"
import { connect } from 'react-redux'

const ProfileInformation = (props) => {
  function returnUserInfo(){
    return(
      <div className="profile-information">
        <img className="profile-picture" src="./images/sivan.jpg" alt="photo" />
        <h1>{props.currentUser.first_name} {props.currentUser.last_name}</h1>
        <h1>{props.currentUser.first_name}</h1>
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
