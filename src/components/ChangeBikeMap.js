import React from "react";
import Bike from './Bike'
import { connect } from 'react-redux'
import InstructorAdapter from '../apis/InstructorAdapter'
import remove from '../images/remove.png'
import moment from 'moment'
import UserClassAdapter from '../apis/UserClassAdapter'
import LocationAdapter from '../apis/LocationAdapter'
import StudioAdapter from '../apis/StudioAdapter'
import success from '../images/success.png'

class ChangeBikeMap extends React.Component {
  state = {
    updated: null,
    userClasses: [],
    instructors: [],
    locations: [],
    studios: []
  }

  componentDidMount(){
    InstructorAdapter.getInstructors()
    .then(instructors => this.setState({ instructors }))
  }

  getInstructorInfo = spinClass => {
    if (spinClass && this.state.instructors && this.state.instructors.length !== 0) {
      let instructor = this.state.instructors.find(instructor => instructor.id === spinClass.instructor_id)
      console.log(instructor);
      return <h1>{instructor.name.toUpperCase()}</h1>
    }
  }

  getInstructorPhoto = spinClass => {
    if (this.state.instructors && this.state.instructors.length !== 0) {
      let instructor = this.state.instructors.find(instructor => instructor.id === spinClass.instructor_id)
      return instructor.profile_pic
    }
  }

  getInstructor = () => {
    let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === this.state.updated.spin_class_id)
    let instructor = this.state.instructors.find(instructor => instructor.id === spinClass.instructor_id)
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
    this.props.history.push('/profile')
    this.setState({
      updated: null
    })
  }

  convertUTCDateToLocalDate = date => {
    var dateFormat = new Date(date)
    var newDate = new Date(dateFormat.getTime()+dateFormat.getTimezoneOffset()*60*1000);
    return newDate;
  }

  getSpinClassInfo = () => {
    let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === this.props.changeBike.spin_class_id)
    let date = moment(spinClass.start.toString()).format('llll').slice(0, 17)
    let start = this.convertUTCDateToLocalDate(spinClass.start)
    let end = this.convertUTCDateToLocalDate(spinClass.end)
    let startSliced = moment(start.toString()).format('llll').slice(17, 30)
    let endSliced = moment(end.toString()).format('llll').slice(17, 30)
    return (
      <div>
        <span onClick={this.closeModal}>
          <img className="remove" src={remove} alt="remove" />
        </span>
        <h1 className="modal-header">YOU ARE CURRENTLY RESERVED FOR: {spinClass.time}</h1>
        <h1>{date} ({startSliced} - {endSliced} )</h1>
        {this.getInstructorInfo(spinClass)}
        <img className="booking-map-instructor" src={this.getInstructorPhoto(spinClass)} alt="profile" />
        <br/>
        <p className="modal-text">Select an available bike from the map below to change your reservation. Your current bike is highlighted.</p>
      </div>
    )
  }

  confirmBooking = () => {
    let spinClass = this.props.changeBike.spin_class_id
    let user_id = this.props.currentUser.id
    let bike = this.props.setSelectedChangedBike
    let userClass = this.props.changeBike.id
    UserClassAdapter.updateUserClass(userClass, spinClass, user_id, bike)
    .then(res => {
      debugger
      this.setState({
        updated: res
      })
      let updated = this.state.userClasses.map(userClass => {
        if (userClass.id === res.id) {
          return userClass = res
        } else {
          return userClass
        }
      })
      this.sendText(res)
      this.props.updateUserClasses(updated)
    })
  }

  sendText = (userClass) => {
    let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === this.props.changeBike.spin_class_id)
    let instructor = this.state.instructors.find(instructor => instructor.id === spinClass.instructor_id)
    let studio = this.state.studios.find(studio => studio.id === spinClass.studio_id)
    let location = this.state.locations.find(location => location.id === spinClass.location_id)

    let date = moment(spinClass.start.toString()).format('llll').slice(0, 17)
    let start = moment(spinClass.start.toString()).format('llll').slice(17, 30)
    let end = moment(spinClass.end.toString()).format('llll').slice(17, 30)
    let data = {
      message: `You just changed your bike! You are now booked on bike ${userClass.bike} for ${spinClass.time} at ${studio.name} (${location.name}: ${location.address}) on ${date} from ${start} - ${end} with ${instructor.name}! See you then!! 😃`
    }
    fetch("http://localhost:3000/api/v1/send_text",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
  }

  confirmChange = () => {
    let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === this.props.changeBike.spin_class_id)
    let date = moment(spinClass.start.toString()).format('llll').slice(0, 17)
    let start = this.convertUTCDateToLocalDate(spinClass.start)
    let end = this.convertUTCDateToLocalDate(spinClass.end)
    let startSliced = moment(start.toString()).format('llll').slice(17, 30)
    let endSliced = moment(end.toString()).format('llll').slice(17, 30)
    return (
      <div className="booking-map">
        <span onClick={this.closeModal}>
          <img className="remove" src={remove} alt="remove" />
        </span>
        <h1 className="modal-header">{spinClass.time}</h1>
        <h1>{date} ({startSliced} - {endSliced} )</h1>
        <img className="booking-map-instructor" src={this.getInstructorPhoto(spinClass)} alt="profile" />
        {this.getInstructorInfo(spinClass)}
        <br/>
        <h3 className="modal-text">Are you sure you want to book <strong>Bike {this.props.setSelectedChangedBike}?</strong></h3>
        <button className="login-btn" onClick={this.confirmBooking}>BOOK</button>
        <button className="login-btn" onClick={this.handleGoBack}>GO BACK</button>
      </div>
    )
  }

  renderBikes = () => {
    let bikes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]
    let thisClass = this.props.spinClasses.find(spinClass => spinClass.id === this.props.changeBike.spin_class_id)
    let filteredUserClasses = this.state.userClasses.filter(userClass => userClass.spin_class_id === thisClass.id)
    let filteredBikes = []
    filteredUserClasses.map(userClass => {
      filteredBikes.push(userClass.bike)
    })
    return bikes.map(bike => {
      if (this.props.changeBike.bike === bike) {
        return <Bike number={bike} editBike={this.props.changeBike.bike} className={"my-reserved-bike"}/>
      } else if (filteredBikes.includes(bike)){
        return <Bike number={bike} editBike={this.props.changeBike.bike} className={"reserved-bike"}/>
      } else {
      return <Bike number={bike} editBike={this.props.changeBike.bike} className={"bike"}/>}})
  }

  findInstructors = () => {
    InstructorAdapter.getInstructors()
    .then(instructors => {
      this.setState({ instructors })
    })
  }

  findLocations = () => {
    LocationAdapter.getLocations()
    .then(locations => {
      this.setState({ locations })
    })
  }

  findStudios = () => {
    StudioAdapter.getStudios()
    .then(studios => {
      this.setState({ studios })
    })
  }

  componentDidMount(){
    this.findInstructors()
    this.findLocations()
    this.findStudios()
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
            <h1 className="modal-header">SUCCESS! YOU HAVE CHANGED YOUR BIKE TO: </h1>
            <p className="modal-text">Bike {this.state.updated.bike} with {this.getInstructorInfo()}</p>
            <img className="success" src={success} alt="success"/>
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
    setSelectedChangedBike: state.setSelectedChangedBike,
    locations: state.locations,
    studios: state.studios
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    storeInstructors: (array) => dispatch({ type: "GET_INSTRUCTORS", payload: array }),
    changeBikeNumber: () => dispatch({ type: "CHANGE_BIKE", payload: null}),
    changeUpdatedBikeNumber: () => dispatch({ type: "SET_SELECTED_CHANGED_BIKE", payload: null}),
    updateUserClasses: (userClass) =>dispatch({ type: "UPDATE_USER_CLASSES", payload: userClass})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(ChangeBikeMap)
