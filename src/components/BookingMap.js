import React from "react";
import { connect } from 'react-redux'
import Bike from './Bike'
import { Redirect } from 'react-router'
import UserClassAdapter from '../apis/UserClassAdapter'
import SpinClassAdapter from '../apis/SpinClassAdapter'
import InstructorAdapter from '../apis/InstructorAdapter'
import StudioAdapter from '../apis/StudioAdapter'
import LocationAdapter from '../apis/LocationAdapter'
import remove from '../images/remove.png'
import moment from 'moment'
import success from '../images/success.png'

class BookingMap extends React.Component {
  state = {
    booked: null,
    userClasses: [],
    updated: null,
    spinClasses: [],
    instructors: [],
    studios: [],
    locations: []
  }

  getInstructorsPlease = () => {
    InstructorAdapter.getInstructors()
    .then(instructors => {
      this.setState({ instructors })
    })
  }

  getInstructorInfo = () => {
    if (this.props.bookThisClass && this.state.instructors.length !== 0) {
      let instructor = this.state.instructors.find(instructor => instructor.id === this.props.bookThisClass.instructor_id)
      return <h1>{instructor.name.toUpperCase()}</h1>
    }
  }

  getInstructorPhoto = () => {
    if (this.props.bookThisClass && this.state.instructors.length !== 0) {
      let instructor = this.state.instructors.find(instructor => instructor.id === this.props.bookThisClass.instructor_id)
      return instructor.profile_pic
    }
  }

  renderBikes = () => {
    console.log(this.props.alreadyReservedBike)
    let myBike
    let bikes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]
    let thisClass = this.props.bookThisClass.class_id
    if (this.state.userClasses.length === 0) {
      this.findUserClasses()
    } else {
    let filteredUserClasses = this.state.userClasses.filter(userClass => userClass.spin_class_id === thisClass)
    let filteredBikes = []
    if (filteredUserClasses.length !== 0) {
      filteredUserClasses.map(userClass => {
        if (this.props.alreadyReservedBike && userClass.bike !== this.props.alreadyReservedBike.bike) {
          filteredBikes.push(userClass.bike)
        } else if (!this.props.alreadyReservedBike){
          filteredBikes.push(userClass.bike)
        }
      })
    }
    return bikes.map(bike => {
        if (filteredBikes.includes(bike)) {
          return <Bike number={bike} className={"reserved-bike"} alreadyReservedBike={this.props.alreadyReservedBike}/>
        } else if (this.props.alreadyReservedBike && this.props.alreadyReservedBike.bike === bike) {
          return <Bike number={bike} className={"my-reserved-bike"} alreadyReservedBike={this.props.alreadyReservedBike}/>
        } else {
          return <Bike number={bike} className={"bike"} alreadyReservedBike={this.props.alreadyReservedBike}/>
        }
      })
    }
  }

  confirmChange = () => {
    let userClass = this.props.alreadyReservedBike.id
    let spinClass = this.props.changeBike
    let id = this.props.currentUser.id
    let selectedBike = this.props.selectedBike
    UserClassAdapter.updateUserClass(userClass, spinClass, id, selectedBike)
    .then(res => {
      this.setState({
        updated: res
      })
      this.sendUpdatedText(res)
    })
  }

  sendUpdatedText = (userClass) => {
    let spinClass = this.state.spinClasses.find(spinClass => spinClass.id === this.props.alreadyReservedBike.spin_class_id)
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

  confirmBooking = () => {
    UserClassAdapter.createUserClass(this.props.bookThisClass, this.props.currentUser.id, this.props.selectedBike)
    .then(res => {
      this.setState({
        booked: res
      })
      this.sendText(res)
    })

  }

  getStudioPlease = () => {
    StudioAdapter.getStudios()
    .then(studios => {
      this.setState({ studios })
    })
  }

  getLocationsPlease = () => {
    LocationAdapter.getLocations()
    .then(locations => {
      this.setState({ locations })
    })
  }

  sendText = (userClass) => {
    let instructor = this.state.instructors.find(instructor => instructor.id === this.props.bookThisClass.instructor_id)
    let studio = this.state.studios.find(studio => studio.id === this.props.bookThisClass.studio_id)
    let location = this.state.locations.find(location => location.id === this.props.bookThisClass.location_id)
    let date = this.props.bookThisClass.start.toString().slice(0,15)
    let start = moment(this.props.bookThisClass.start.toString()).format('llll').slice(17, 30)
    let end = moment(this.props.bookThisClass.end.toString()).format('llll').slice(17, 30)
    let data = {
      message: `You are booked on bike ${userClass.bike} for ${this.props.bookThisClass.title} at ${studio.name} (${location.name}: ${location.address}) on ${date} from ${start} - ${end} with ${instructor.name}! See you then!! 😃`
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

  redirect = () => {
    this.props.history.push('/profile')
    this.setState({
      booked: null
    })
  }

  handleGoBack = () => {
    this.props.history.push('/reserve')
    this.props.closeBookClassWindow()
    this.props.setSelectedBikeToFalse()
  }

  closeModal = () => {
    this.props.history.push('/reserve')
    this.props.closeBookClassWindow()
    this.props.setSelectedBikeToFalse()
  }

  getConfirmationModal = () => {
    if (this.props.alreadyReservedBike) {
      return (
        <div className="booking-map">
          <h3 className="modal-text">Are you sure you want to change your bike to {this.props.selectedBike}?</h3>
          <button className="login-btn" onClick={this.confirmChange}>CHANGE BIKE</button>
          <button className="login-btn" onClick={this.handleGoBack}>GO BACK</button>
        </div>
      )
    } else {
      return (
        <div className="booking-map">
          <p className="modal-text">Are you sure you want to book <strong>Bike {this.props.selectedBike}?</strong></p>
          <button className="login-btn" onClick={this.confirmBooking}>BOOK</button>
          <button className="login-btn" onClick={this.handleGoBack}>GO BACK</button>
        </div>
      )
    }
  }

  getSpinClasses = () => {
    SpinClassAdapter.getSpinClasses()
    .then(spinClasses => {
      this.setState({ spinClasses })
    })
  }
  findUserClasses = () => {
    UserClassAdapter.getUserClasses()
    .then(userClasses => {
      this.setState({ userClasses })
    })
  }

  getDateAndTime = () => {
    let date = moment(this.props.bookThisClass.start.toString()).format('llll').slice(0, 17)
    let start = moment(this.props.bookThisClass.start.toString()).format('llll').slice(17, 30)
    let end = moment(this.props.bookThisClass.end.toString()).format('llll').slice(17, 30)
    return (
      <h1>{date} ({start} - {end} )</h1>
    )
  }

  componentDidMount(){
    this.getSpinClasses()
    this.getInstructorsPlease()
    this.findUserClasses()
    this.getStudioPlease()
    this.getLocationsPlease()
  }

  render() {
    return (
      <div className="modal">
        <div className="booking-map modal-main" >
          <span onClick={this.closeModal}>
            <img className="remove" src={remove} alt="remove" />
          </span>
          <br/><br/>
          <h1 className="modal-header">{this.props.bookThisClass.title}</h1>
          {this.getDateAndTime()}
          {this.getInstructorInfo()}
          <img className="booking-map-instructor" src={this.getInstructorPhoto()} alt="profile" />
          {!this.props.selectedBike ?
            !this.props.changeBike
            ?
            <p className="modal-text">Select an available bike from the map below to make your reservation.</p>
            :
            <p className="modal-text">Select an available bike from the map below to change your reservation. Your current bike is highlighted.</p>
            :
            null
          }
          <br/>
          {
            !this.props.selectedBike
            ?
            this.renderBikes()
            :
            this.getConfirmationModal()
          }
          {
            this.state.booked
            ?
            <div className="modal-main2">
              <span onClick={this.closeModal}>
                <img className="remove" src={remove} alt="remove" />
              </span>
              <h1 className="modal-header">SUCCESS! YOU HAVE BOOKED: </h1>
              <p className="modal-text">Bike {this.state.booked.bike} for {this.props.bookThisClass.title} with {this.getInstructorInfo()}</p>
              <img className="success" src={success} alt="success"/>
            </div>
            :
            null
          }

          {
            this.state.updated
            ?
            <div className="modal-main2">
              <span onClick={this.closeModal}>
                <img className="remove" src={remove} alt="remove" />
              </span>
              <h1 className="modal-header">SUCCESS! YOU HAVE CHANGED YOUR BIKE TO: </h1>
              <p className="modal-text">Bike {this.state.updated.bike} for {this.props.bookThisClass.title} with {this.getInstructorInfo()}</p>
              <img className="success" src={success} alt="success"/>
            </div>
            :
            null
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
    currentUser: state.currentUser,
    changeBike: state.changeBike,
    userClasses: state.userClasses,
    studios: state.studios,
    locations: state.locations,
    alreadyReservedBike: state.alreadyReservedBike,
    spinClasses: state.spinClasses
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    setSelectedBikeToFalse: () => dispatch({ type: "SET_SELECTED_BIKE", payload: null}),
    closeBookClassWindow: () => dispatch({ type: "OPEN_BOOK_CLASS_WINDOW", payload: null}),
    setInstructors: (instructors) => dispatch({ type: "GET_INSTRUCTORS", payload: instructors})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(BookingMap)
