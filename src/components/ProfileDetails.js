import React from "react"
import ProfileNav from './ProfileNav'
import ChangeBikeMap from './ChangeBikeMap'
import UserClassAdapter from '../apis/UserClassAdapter'
import SpinClassAdapter from '../apis/SpinClassAdapter'
import FavoriteAdapter from '../apis/FavoriteAdapter'
import StudioAdapter from '../apis/StudioAdapter'
import InstructorAdapter from '../apis/InstructorAdapter'
import LocationAdapter from '../apis/LocationAdapter'
import remove from '../images/remove.png'
import { connect } from 'react-redux'
import moment from 'moment'

class ProfileDetails extends React.Component {
  state = {
    favorites: [],
    studiosArr: [],
    instructors: [],
    locations: []
  }

  getSpinClass = (userClass) => {
    if (this.props.spinClasses.length !== 0) {
      let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === userClass.spin_class_id)
      return spinClass.time
    }
  }

  getStudioNameForCard = (userClass) => {
    if (this.props.spinClasses.length !== 0) {
      let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === userClass.spin_class_id)
      let studio = this.state.studiosArr.find(studio => studio.id === spinClass.studio_id)
      return studio.name
    }
  }

  getInstructorForCard = (userClass) => {
    if (this.props.spinClasses.length !== 0 && this.state.instructors.length !== 0) {
      let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === userClass.spin_class_id)
      let instructor = this.state.instructors.find(instructor => instructor.id === spinClass.instructor_id)
      return instructor.name
    }
  }

  getLocationForCard = (userClass) => {
    if (this.props.spinClasses.length !== 0 && this.state.locations.length !== 0) {
      let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === userClass.spin_class_id)
      let location = this.state.locations.find(location => location.id === spinClass.location_id)
      return location.address
    }
  }


  cancelClass = userClass => {
    UserClassAdapter.destroyUserClass(userClass.id)
    .then(res => {
      this.getUserClasses()
      this.sendText(userClass)
    })
  }

  sendText = (userClass) => {
    let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === userClass.spin_class_id)
    let instructor = this.state.instructors.find(instructor => instructor.id === spinClass.instructor_id)
    let studio = this.state.studiosArr.find(studio => studio.id === spinClass.studio_id)
    let location = this.state.locations.find(location => location.id === spinClass.location_id)
    let date = moment(spinClass.end.toString()).format('llll').slice(0, 17)
    let start = moment(spinClass.start.toString()).format('llll').slice(17, 30)
    let end = moment(spinClass.end.toString()).format('llll').slice(17, 30)
    let data = {
      message: `You just cancelled your bike for ${spinClass.time} at ${studio.name} (${location.name}: ${location.address}) on ${date} from ${start} - ${end} with ${instructor.name}. We're sad to see you go! 😔`
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

  getMyReservations = () => {
    if (this.props.userClasses.length !== 0 && this.props.currentUser) {
      let myUserClasses = this.props.userClasses.filter(userClass => userClass.user_id === this.props.currentUser.id)
      return myUserClasses.map(userClass => {
        if (userClass.bike !== 0 ) {
          return (
            <div className="my-reservations">
              <span onClick={() => this.cancelClass(userClass)}>
                <img className="remove-fav" src={remove} alt="remove" />
              </span>
              <span onClick={() => this.changeBike(userClass)}>
                <h1 className="change-bike">Change Bike</h1>
              </span>
              <h1>{this.getStudioNameForCard(userClass)}: {this.getSpinClass(userClass)} </h1>
              <h3>Instructor: {this.getInstructorForCard(userClass)}</h3>
              <p> {this.getLocationForCard(userClass)} </p>
              <p>Bike: {userClass.bike} </p>
            </div>
        )}
      })
    }
  }

  changeBike = spinClass => {
    this.props.changeBikeNumber(spinClass)
  }

  getMyFavorites = () => {
    FavoriteAdapter.getFavorites()
    .then(favorites => {
      let filtered = favorites.filter(favorite => favorite.user_id === this.props.currentUser.id)
      this.setState({
        favorites: filtered
      })
    })
  }

  // removeDups = studios => {
  //   let unique = {};
  //   studios.forEach(function(i) {
  //     if(!unique[i.id]) {
  //       unique[i.id] = true;
  //     }
  //   });
  //   return Object.keys(unique)
  // }


  goGetStudios = () => {
    StudioAdapter.getStudios()
    .then(studios => {
      this.setState({
        studiosArr: studios
      })
    })
  }

  removeFavorite = favorite => {
    FavoriteAdapter.destroyFavorite(favorite)
    .then(res =>{
      this.getMyFavorites()
    })
  }

  renderFavorites = () => {
    if (this.state.favorites.length === 0) {
      this.getMyFavorites()
    }
    if (this.state.studiosArr.length === 0) {
      this.goGetStudios()
    } else if (this.state.studiosArr.length !== 0 && this.state.favorites.length !== 0){
      return this.state.favorites.map(favorite => {
        let studio = this.getStudioName(favorite)
        return (
          <div>
            <span onClick={() => this.removeFavorite(favorite)}>
              <img className="remove-fav" src={remove} alt="remove" />
            </span>
            <div className="favorites-cards" onClick={() => this.handleRedirectToShowPage(favorite)}>
              <h1 className="favorites-h1">{studio.name}</h1>
              <p className="favorites-h1">{studio.bio}</p>
              <p className="favorites-h1">{studio.website}</p>
            </div>
          </div>
        )
      })
    }
  }

  handleRedirectToShowPage = (favorite) => {
    let studio = this.state.studiosArr.find(studio => studio.id === favorite.studio_id)
    let path = studio.name.toLowerCase().replace(" ","_")
    this.props.history.push(`/${path}`)
  }

  getStudioName = (favorite) => {
    let studio = this.state.studiosArr.find(studio => studio.id === favorite.studio_id)
    return studio
  }

  getUserClasses = () => {
    UserClassAdapter.getUserClasses()
    .then(userClasses => this.props.getUserClasses(userClasses))
  }

  getInstructors = () => {
    InstructorAdapter.getInstructors()
    .then(instructors => {
      this.setState({ instructors })
    })
  }

  getLocations = () => {
    LocationAdapter.getLocations()
    .then(locations => {
      this.setState({ locations })
    })
  }


  componentDidMount(){
    this.getUserClasses()
    this.goGetStudios()
    this.getInstructors()
    this.getLocations()
    SpinClassAdapter.getSpinClasses()
    .then(spinClasses => this.props.saveSpinClasses(spinClasses))
  }

  render() {
    console.log(this.props.changeBike)
    return (
      <div className="profile-details-container">
        <ProfileNav />
        {this.props.myReservations
          ?
          <div>
            <h1 className="favorites-h1">My Reservations </h1>
            {this.getMyReservations()}
          </div>
          :
          null
        }
        {this.props.myFavorites
          ?
          <div>
            <h1 className="favorites-h1"> My Favorites </h1>
            <div>{this.renderFavorites()}</div>
          </div>
          : null
        }

        {
          this.props.changeBike
          ?
          <ChangeBikeMap changeBike={this.props.changeBike} spinClasses={this.props.spinClasses}
          studios={this.props.studios} history={this.props.history}/>
          :
          null
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
    spinClasses: state.spinClasses,
    studios: state.studios,
    changeBike: state.changeBike,
    instructors: state.instructors,
    locations: state.locations
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    getUserClasses: (userClasses) => dispatch({ type: "GET_USER_CLASSES", payload: userClasses}),
    saveSpinClasses: (spinClasses) => dispatch({ type: "SAVE_SPIN_CLASSES", payload: spinClasses}),
    changeBikeNumber: (spinClass) => dispatch({ type: "CHANGE_BIKE", payload: spinClass})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(ProfileDetails)
