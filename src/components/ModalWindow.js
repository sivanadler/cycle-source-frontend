import React from "react";
import { connect } from 'react-redux'
import remove from '../images/remove.png'
import UserClassAdapter from '../apis/UserClassAdapter'
import moment from 'moment'
import ChangeBikeMap from './ChangeBikeMap'

class ModalWindow extends React.Component {
  state = {
    location: null,
    studio: null,
    instructor: null,
    userClasses: [],
  }

  //replace links to links on this website to show page
  //replace instructor photo with seeded data

  bookThisClass = () => {
    this.props.openBookClassWindow(this.props.events)
  }

  getModalInfo = () => {
    if (this.state.userClasses.length !== 0) {
      let foundUserClass = this.state.userClasses.find(userClass => userClass.spin_class_id === this.props.events.class_id)
      if (foundUserClass) {
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
            <h1 className="modal-header"> YOU ARE ALREADY SIGNED UP FOR: {this.props.events.title}</h1>
            <h1>{date} ({start} - {end} )</h1>
            <a className="link" href={`/${studioPath}`}><h1>{this.state.studio.name.toUpperCase()}</h1></a>
            <p className="modal-text">You are currently on <strong>Bike {foundUserClass.bike}</strong></p>
            <p className="modal-text">Want to change your bike?</p>
            <button onClick={() => this.changeMyBike(this.props.events, foundUserClass)} className="login-btn">Change Bike</button>
          </div>
        )
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
                <h1>{this.state.instructor.name.toUpperCase()}</h1>
                <img className="reserve-image" src={this.state.instructor.profile_pic} alt="profile" />
              </a>
              <h1>{date} ({start} - {end} )</h1>
              <a className="link" href={`/${studioPath}`}><h1>{this.state.studio.name.toUpperCase()}</h1></a>
              <p className="modal-text"><strong>LOCATION: </strong> {this.state.location.name} ({this.state.location.address})</p>

              <button onClick={this.bookThisClass} className="login-btn">RESERVE</button>
            </div>
          )
        }
      }
    }
  }

  changeMyBike = (spinClass, userClass) => {
    this.props.openBookClassWindow(this.props.events)
    this.props.changeBikeNumber(spinClass)
    this.props.alreadyReserved(userClass)
  }

  getUserClasses = () => {
    UserClassAdapter.getUserClasses()
    .then(userClasses => {
      this.setState({ userClasses })
    })
  }

  componentDidMount(){
    this.getUserClasses()
    let location = this.props.locations.find(location => location.id === this.props.events.location_id)
    let studio = this.props.studios.find(studio => studio.id === this.props.events.studio_id)
    let instructor = this.props.instructors.find(instructor => instructor.id === this.props.events.instructor_id)
    this.setState({
      location,
      studio,
      instructor
    })
  }

  render() {
    console.log(this.state.userClasses)
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
    currentUser: state.currentUser,
    userClasses: state.userClasses
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    openBookClassWindow: (spinClass) => dispatch({ type: "OPEN_BOOK_CLASS_WINDOW", payload: spinClass}),
    changeBikeNumber: (spinClass) => dispatch({ type: "CHANGE_BIKE", payload: spinClass}),
    alreadyReserved: (userClass) => dispatch({ type: "ALREADY_RESERVED", payload: userClass}),

  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(ModalWindow)
