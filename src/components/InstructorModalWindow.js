import React from "react";
import { connect } from 'react-redux'
import remove from '../images/remove.png'
import UserClassAdapter from '../apis/UserClassAdapter'
import moment from 'moment'

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
    this.props.history.push('/reserve/booking_map')
    this.props.openBookClassWindow(this.props.events)
  }

  getModalInfo = () => {
    // if (this.state.userClasses.length === 0) {
    //   this.getUserClasses()
    // }
    // if (this.state.userClasses.length !== 0 ) {
    //   let myUserClasses = this.state.userClasses.filter(userClass => userClass.user_id === this.props.currentUser.id)
    //   let filteredUserClass = myUserClasses.filter(userClass => userClass.spin_class_id === this.props.events.class_id)
    //   if (filteredUserClass) {
    //     return (
    //       <div className="modal-main">
    //         <span onClick={this.props.closeModal}>
    //           <img className="remove" src={remove} alt="remove" />
    //         </span>
    //         <h1>{this.props.events.title}</h1>
    //         <a href={null}>
    //           <h1>Instructor: {this.state.instructor.name}</h1>
    //           <img src={this.state.instructor.profile_pic} alt="profile" />
    //         </a>
    //         <h1>{this.props.events.start.toString()}</h1>
    //         <a href={`/${studioPath}`}><h1>{this.state.studio.name}</h1></a>
    //         <h4>{this.state.location.name}</h4>
    //         <h4>{this.state.location.address}</h4>
    //
    //         <button onClick={this.bookThisClass}>RESERVE</button>
    //       </div>
    //     )
    //   }
    // }
    if (this.state.instructor && this.state.location && this.state.studio) {
      debugger
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

  getUserClasses = () => {
    UserClassAdapter.getUserClasses()
    .then(userClasses => {
      this.setState({ userClasses })
    }, console.log(this.state.userClasses))
  }

  componentDidMount(){
    this.getUserClasses()
    debugger
    let location = this.props.locations.find(location => location.id === this.props.events.location_id)
    debugger
    let studio = this.props.studios.find(studio => studio.id === this.props.events.studio_id)
    let instructor = this.props.instructors.find(instructor => instructor.id === this.props.events.instructor_id)
    this.setState({
      location,
      studio,
      instructor
    })
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
    openBookClassWindow: (spinClass) => dispatch({ type: "OPEN_BOOK_CLASS_WINDOW", payload: spinClass})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(ModalWindow)
