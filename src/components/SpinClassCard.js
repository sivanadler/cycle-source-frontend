import React from "react";
import UserAdapter from '../apis/UserAdapter'
import StudioAdapter from '../apis/StudioAdapter'
import LocationAdapter from '../apis/LocationAdapter'
import UserClassAdapter from '../apis/UserClassAdapter'
import { connect } from 'react-redux'
import moment from 'moment'

class SpinClassCard extends React.Component {

  state = {
    studios: [],
    locations: [],
    users: [],
    userClasses: []
  }

  getStudios = () => {
    StudioAdapter.getStudios()
    .then(studios => {
      this.setState({ studios })
    })
  }

  getLocations = () => {
    LocationAdapter.getLocations()
    .then(locations => {
      this.setState({ locations })
    })
  }

  getUsers = () => {
    UserAdapter.getUsers()
    .then(users => {
      this.setState({ users })
    })
  }

  getUserClasses = () => {
    UserClassAdapter.getUserClasses()
    .then(userClasses => {
      this.setState({ userClasses })
    })
  }

  getStudioName = () => {
    if (this.state.studios.length !== 0) {
      let studio = this.state.studios.find(studio => studio.id === this.props.spinClass.studio_id)
      return studio.name
    }
  }

  getLocationName = () => {
    if (this.state.locations.length !== 0) {
      let location = this.state.locations.find(location => location.id === this.props.spinClass.location_id)
      return location.name
    }
  }

  getBikeNum = rider => {
    let userClass = this.state.userClasses.find(userClass => userClass.user_id === rider.id)
    return userClass.bike
  }

  getListOfRiders = () => {
    if (this.state.users.length !== 0 && this.state.userClasses.length !== 0) {
      let myUserClassesIds = []
      this.state.userClasses.filter(userClass => {
        if (userClass.spin_class_id === this.props.spinClass.id) {
          myUserClassesIds.push(userClass.user_id)
        }
      })
      let myRiders = this.state.users.filter(user => myUserClassesIds.includes(user.id))
      return myRiders.map(rider => {
        return (
          <div>
            <p>{rider.name}: Bike {this.getBikeNum(rider)}</p>
          </div>
        )
      })
    }
  }

  getDateAndTime = () => {
    let spinClass = this.props.spinClass
    let date = moment(spinClass.end.toString()).format('llll').slice(0, 17)
    let start = moment(spinClass.start.toString()).format('llll').slice(17, 30)
    let end = moment(spinClass.end.toString()).format('llll').slice(17, 30)
    return <div><h3>{date}</h3> <h3>{start} - {end}</h3></div>

    debugger
  }

  componentDidMount(){
    this.getStudios()
    this.getLocations()
    this.getUsers()
    this.getUserClasses()
  }

  render() {
    return (
      <div className="class-cards">
        <div className="class-cards-header">
          <h1>{this.props.spinClass.time}</h1>
          <h1>{this.getStudioName()}</h1>
          {this.getDateAndTime()}
        </div>
        <h1>Riders Signed Up:</h1>
        {this.getListOfRiders()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    locations: state.locations
  }
}

const mapDispatchtoProps = dispatch => {
  return{
    setCurrentUser: (user) => dispatch({ type: "SET_CURRENT_USER", payload: user}),
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(SpinClassCard)
