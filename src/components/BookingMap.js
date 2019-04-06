import React from "react";
import { connect } from 'react-redux'
import Bike from './Bike'
import { Redirect } from 'react-router'
import UserClassAdapter from '../apis/UserClassAdapter'


class BookingMap extends React.Component {

  getInstructorInfo = () => {
    if (this.props.bookThisClass) {
      let instructor = this.props.instructors.find(instructor => instructor.id === this.props.bookThisClass.instructor_id)
      return <h1>{instructor.name}</h1>
    }
  }

  renderBikes = () => {
    let bikes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]
    return bikes.map(bike => <Bike number={bike}/>)
  }

  confirmBooking = () => {
    UserClassAdapter.createUserClass(this.props.bookThisClass, this.props.currentUser.id, this.props.selectedBike)
    .then(res => {
      console.log(res);
    })
    debugger
  }

  render() {
    return (
      <div>
        <h1>BOOK YOUR RIDE</h1>
        <div className="booking-map">
          <h2>{this.props.bookThisClass.title}</h2>
          <h2>{this.props.bookThisClass.start.toString()}</h2>
          {!this.props.selectedBike ? <h3>Select an available bike from the map below to make your reservation.</h3> : null}
          {this.getInstructorInfo()}
          <img className="booking-map-instructor" src="https://instructors.flywheelsports.com/510/Emily_Fayette_dfac98143c2a4f45b3d9e8b5f272feb950e141f7.jpg" alt="profile" />
          <br/>
          {
            !this.props.selectedBike
            ?
            this.renderBikes()
            :
            <div className="booking-map">
              <h3>Are you sure you want to book bike {this.props.selectedBike}?</h3>
              <button onClick={this.confirmBooking}>BOOK</button>
              <button onClick={<Redirect to='/reserve' />}>GO BACK</button>
            </div>
          }

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    bookThisClass: state.bookThisClass,
    instructors: state.instructors,
    selectedBike: state.selectedBike,
    currentUser: state.currentUser
  }
}

const mapDispatchtoProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(BookingMap)
