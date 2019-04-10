import React from "react";
import Bike from './Bike'
import { connect } from 'react-redux'
import InstructorAdapter from '../apis/InstructorAdapter'
import remove from '../images/remove.png'
import moment from 'moment'
import UserClassAdapter from '../apis/UserClassAdapter'
class ChangeBikeMap extends React.Component {
  state = {
    updated: null,
    userClasses: []
  }

  componentDidMount(){
    InstructorAdapter.getInstructors()
    .then(instructors => this.props.storeInstructors(instructors))
  }

  getInstructorInfo = spinClass => {
    if (this.props.instructors && this.props.instructors.length !== 0) {
      let instructor = this.props.instructors.find(instructor => instructor.id === spinClass.instructor_id)
      return <h1>{instructor.name}</h1>
    }
  }

  getInstructor = () => {
    let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === this.state.updated.spin_class_id)
    let instructor = this.props.instructors.find(instructor => instructor.id === spinClass.instructor_id)
    return instructor.name
  }

  getSpinClassTitle = () => {
    let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === this.state.updated.spin_class_id)
    return spinClass.time
  }

  closeModal = () => {
    this.props.changeBikeNumber()
    this.props.changeUpdatedBikeNumber()
  }

  closeModalDone = () => {
    this.props.changeBikeNumber()
    this.props.changeUpdatedBikeNumber()
    this.props.history.push('/profile/reservations')
  }

  getSpinClassInfo = () => {
    let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === this.props.changeBike.spin_class_id)
    let startTime = moment(spinClass.start.toString()).format('llll')
    let endTime = moment(spinClass.end.toString()).format('llll')
    return (
      <div>
        <span onClick={this.closeModal}>
          <img className="remove" src={remove} alt="remove" />
        </span>
        <h1>You Are Currently Reserved For:</h1>
        <h1>{spinClass.time}</h1>
        <h1>{startTime} - {endTime}</h1>
        <h1>Bike: {this.props.changeBike.bike}</h1>
        <img className="booking-map-instructor" src="https://instructors.flywheelsports.com/510/Emily_Fayette_dfac98143c2a4f45b3d9e8b5f272feb950e141f7.jpg" alt="profile" />
        {this.getInstructorInfo(spinClass)}
        <br/>
        <h3>To change your bike, select an available bike from the map below.</h3>
      </div>
    )
  }

  confirmBooking = () => {
    console.log(this.props)
    let spinClass = this.props.changeBike.spin_class_id
    let user_id = this.props.currentUser.id
    let bike = this.props.setSelectedChangedBike
    let userClass = this.props.changeBike.id
    UserClassAdapter.updateUserClass(userClass, spinClass, user_id, bike)
    .then(res => {
      this.setState({
        updated: res
      })
    })
  }

  confirmChange = () => {
    let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === this.props.changeBike.spin_class_id)
    let startTime = moment(spinClass.start.toString()).format('llll')
    let endTime = moment(spinClass.end.toString()).format('llll')
    return (
      <div className="booking-map">
        <span onClick={this.closeModal}>
          <img className="remove" src={remove} alt="remove" />
        </span>
        <h1>{spinClass.time}</h1>
        <h1>{startTime} - {endTime}</h1>
        <img className="booking-map-instructor" src="https://instructors.flywheelsports.com/510/Emily_Fayette_dfac98143c2a4f45b3d9e8b5f272feb950e141f7.jpg" alt="profile" />
        {this.getInstructorInfo(spinClass)}
        <br/>
        <h3>Are you sure you want to book bike {this.props.setSelectedChangedBike}?</h3>
        <button onClick={this.confirmBooking}>BOOK</button>
        <button onClick={this.handleGoBack}>GO BACK</button>
      </div>
    )
  }

  renderBikes = () => {
    let bikes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]
    let thisClass = this.props.spinClasses.find(spinClass => spinClass.id === this.props.changeBike.spin_class_id)
    let filteredUserClasses = this.state.userClasses.filter(userClass => userClass.spin_class_id === thisClass.id)
    let filteredBikes = []
    filteredUserClasses.map(userClass => {
      filteredBikes.push(userClass.bike)
    })
    return bikes.map(bike => {
      if (this.props.changeBike.bike === bike) {
        return <Bike number={bike} editBike={this.props.changeBike.bike} className={"edit-bike"}/>
      } else if (filteredBikes.includes(bike)){
        return <Bike number={bike} editBike={this.props.changeBike.bike} className={"reserved-bike"}/>
      } else {
      return <Bike number={bike} editBike={this.props.changeBike.bike} className={"bike"}/>}})
  }

  componentDidMount(){
    UserClassAdapter.getUserClasses()
    .then(userClasses => {
      this.setState({ userClasses })
    })
  }

  render() {
    console.log(this.props)
    return (
      <div className={this.props.changeBike ? "modal" : "nothing"}>
        {
          this.props.setSelectedChangedBike
          ?
          <div className={this.props.setSelectedChangedBike ? "modal-main" : "nothing"}>
            {this.props.setSelectedChangedBike ? this.confirmChange() : null}
          </div>
          :
          <div className={this.props.changeBike ? "modal-main" : "nothing"}>
            {this.props.changeBike ? this.getSpinClassInfo() : null}
            {this.renderBikes()}
          </div>
        }

        {
          this.state.updated
          ?
          <div className="modal-main2">
            <span onClick={this.closeModalDone}>
              <img className="remove" src={remove} alt="remove" />
            </span>
            <h1>Success! You Changed Your Bike!</h1>
            <h3>Bike {this.state.updated.bike} for {this.getSpinClassTitle()} with {this.getInstructor()}</h3>
          </div>
          :
          null
        }

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    instructors: state.instructors,
    setSelectedChangedBike: state.setSelectedChangedBike
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    storeInstructors: (array) => dispatch({ type: "GET_INSTRUCTORS", payload: array }),
    changeBikeNumber: () => dispatch({ type: "CHANGE_BIKE", payload: null}),
    changeUpdatedBikeNumber: () => dispatch({ type: "SET_SELECTED_CHANGED_BIKE", payload: null})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(ChangeBikeMap)
