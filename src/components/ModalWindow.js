import React from "react";
import { connect } from 'react-redux'
import remove from '../images/remove.png'
import UserClassAdapter from '../apis/UserClassAdapter'

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
    console.log(this.props.events);
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
      let studioPath = this.state.studio.name.toLowerCase().replace(" ","_")
      return (
        <div className="modal-main">
          <span onClick={this.props.closeModal}>
            <img className="remove" src={remove} alt="remove" />
          </span>
          <h1>{this.props.events.title}</h1>
          <a href={null}>
            <h1>Instructor: {this.state.instructor.name}</h1>
            <img src="https://instructors.flywheelsports.com/510/Emily_Fayette_dfac98143c2a4f45b3d9e8b5f272feb950e141f7.jpg" alt="profile" />
          </a>
          <h1>{this.props.events.start.toString()}</h1>
          <a href={`/${studioPath}`}><h1>{this.state.studio.name}</h1></a>
          <h4>{this.state.location.name}</h4>
          <h4>{this.state.location.address}</h4>

          <button onClick={this.bookThisClass}>RESERVE</button>
        </div>
      )
    }
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
