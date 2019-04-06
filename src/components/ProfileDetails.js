import React from "react"
import ProfileNav from './ProfileNav'
import UserClassAdapter from '../apis/UserClassAdapter'
import SpinClassAdapter from '../apis/SpinClassAdapter'
import { connect } from 'react-redux'

class ProfileDetails extends React.Component {

  getSpinClass = (userClass) => {
    if (this.props.spinClasses.length !== 0) {
      let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === userClass.spin_class_id)
      return spinClass.time
    }
  }

  getMyReservations = () => {
    if (this.props.userClasses.length !== 0 && this.props.currentUser) {
      let myUserClasses = this.props.userClasses.filter(userClass => userClass.user_id === this.props.currentUser.id)
      return myUserClasses.map(userClass => {
        if (userClass.bike !== 0 ) {
          return (<div className="my-reservations">
            <h1> {this.getSpinClass(userClass)} </h1>
            <h1>Bike: {userClass.bike} </h1>
          </div>
        )}
      })
    }
  }

  componentDidMount(){
    UserClassAdapter.getUserClasses()
    .then(userClasses => this.props.getUserClasses(userClasses))
    SpinClassAdapter.getSpinClasses()
    .then(spinClasses => this.props.saveSpinClasses(spinClasses))
  }

  render() {
    console.log(this.props.spinClasses);
    return (
      <div className="profile-details-container">
        <ProfileNav />
        {this.props.myReservations
          ?
          <div>
          <h1>My Reservations </h1>
          {this.getMyReservations()}
          </div>
          :
          null
        }
        {this.props.myFavorites
          ?
          <h1> My Favorites </h1>
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    myReservations: state.myReservations,
    myFavorites: state.myFavorites,
    userClasses: state.userClasses,
    currentUser: state.currentUser,
    spinClasses: state.spinClasses
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    getUserClasses: (userClasses) => dispatch ({ type: "GET_USER_CLASSES", payload: userClasses}),
    saveSpinClasses: (spinClasses) => dispatch ({ type: "SAVE_SPIN_CLASSES", payload: spinClasses})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(ProfileDetails)
