import React from "react";
import { connect } from 'react-redux'
import remove from '../images/remove.png'
import UserClassAdapter from '../apis/UserClassAdapter'
import LocationAdapter from '../apis/LocationAdapter'
import StudioAdapter from '../apis/StudioAdapter'

import moment from 'moment'

class InstructorModalWindow extends React.Component {
  state = {
    location: null,
    studio: null,
    instructor: null,
    userClasses: [],
  }

  //replace links to links on this website to show page
  //replace instructor photo with seeded data

  bookThisClass = () => {
    this.props.history.push('/reserve/booking_map')
    this.props.openBookClassWindow(this.props.events)
  }

  changeMyBike = (spinClass, userClass) => {
    this.props.history.push('/reserve/booking_map')
    this.props.openBookClassWindow(this.props.events)
    this.props.changeBikeNumber(spinClass)
    this.props.alreadyReserved(userClass)
  }

  getModalInfo = () => {
    if (this.state.userClasses.length !== 0) {
      let foundUserClass = this.state.userClasses.find(userClass => userClass.spin_class_id === this.props.events.class_id)
      if (foundUserClass && this.state.instructor && this.state.location && this.state.studio) {
        let studioPath = this.state.studio.name.toLowerCase().replace(" ","_")
        let instructorPath = this.state.instructor.name.toLowerCase().replace(" ","_")
        let date = moment(this.props.events.start.toString()).format('llll').slice(0,17)
        let start = moment(this.props.events.start.toString()).format('llll').slice(17, 27)
        let end = moment(this.props.events.end.toString()).format('llll').slice(17, 27)
        return (
          <div className="modal-main">
            <div onClick={this.props.closeModal}>
              <img className="remove" src={remove} alt="remove" />
            </div>
            <br/><br/>
            <h1 className="modal-header"> You Are Already Signed Up For {this.props.events.title}</h1>
            <h1>{date} from {start} - {end}</h1>
            <a className="link" href={`/${studioPath}`}><h1>{this.state.studio.name}</h1></a>
            <h3>You are currently on Bike {foundUserClass.bike}</h3>
            <br/>
            <p>Want to change your bike?</p>
            <button onClick={() => this.changeMyBike(this.props.events, foundUserClass)}>Change Bike</button>
          </div>
        )}
    } else {
      if (this.state.instructor && this.state.location && this.state.studio) {
        let studioPath = this.state.studio.name.toLowerCase().replace(" ","_")
        let instructorPath = this.state.instructor.name.toLowerCase().replace(" ","_")
        let date = moment(this.props.events.start.toString()).format('llll').slice(0,17)
        let start = moment(this.props.events.start.toString()).format('llll').slice(17, 27)
        let end = moment(this.props.events.end.toString()).format('llll').slice(17, 27)
        return (
          <div className="modal-main">
            <div onClick={this.props.closeModal}>
              <img className="remove" src={remove} alt="remove" />
            </div>
            <br/><br/>
            <h1 className="modal-header">{this.props.events.title}</h1>
            <a className="link" href={`/instructors/${instructorPath}`}>
              <h1>Instructor: {this.state.instructor.name}</h1>
              <img className="reserve-image" src={this.state.instructor.profile_pic} alt="profile" />
            </a>
            <h1>{date} from {start} - {end}</h1>
            <a className="link" href={`/${studioPath}`}><h1>{this.state.studio.name}</h1></a>
            <h3>{this.state.location.name}</h3>
            <h3>{this.state.location.address}</h3>

            <button onClick={this.bookThisClass}>RESERVE</button>
          </div>
        )
      }
    }
  }

  getUserClasses = () => {
    UserClassAdapter.getUserClasses()
    .then(userClasses => {
      this.setState({ userClasses })
    }, console.log(this.state.userClasses))
  }

  getLocation = () => {
    LocationAdapter.getLocations()
    .then(locations => {
      let location = locations.find(locaiton => locaiton.id === this.props.events.location_id)
      this.setState({ location })
    })
  }

  getStudio = () => {
    StudioAdapter.getStudios()
    .then(studios => {
      let studio = studios.find(studio => studio.id === this.props.events.studio_id)
      this.setState({ studio })
    })
  }

  componentDidMount(){
    this.getUserClasses()
    this.getLocation()
    this.getStudio()
    let instructor = this.props.instructor
    this.setState({ instructor })
  }

  render() {
    return (
      <div>
        {
          this.props.events
          ?
          this.getModalInfo()
          :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations,
    studios: state.studios,
    instructors: state.instructors,
    spinClasses: state.spinClasses,
    currentUser: state.currentUser
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    openBookClassWindow: (spinClass) => dispatch({ type: "OPEN_BOOK_CLASS_WINDOW", payload: spinClass}),
    changeBikeNumber: (spinClass) => dispatch({ type: "CHANGE_BIKE", payload: spinClass}),
    alreadyReserved: (userClass) => dispatch({ type: "ALREADY_RESERVED", payload: userClass}),
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(InstructorModalWindow)
