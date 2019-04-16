import React from "react"
import ProfileNav from './ProfileNav'
import ChangeBikeMap from './ChangeBikeMap'
import UserClassAdapter from '../apis/UserClassAdapter'
import SpinClassAdapter from '../apis/SpinClassAdapter'
import FavoriteAdapter from '../apis/FavoriteAdapter'
import StudioAdapter from '../apis/StudioAdapter'
import InstructorAdapter from '../apis/InstructorAdapter'
import LocationAdapter from '../apis/LocationAdapter'
import InstructorFavoriteAdapter from '../apis/InstructorFavoriteAdapter'

import remove from '../images/remove.png'
import { connect } from 'react-redux'
import moment from 'moment'

class ProfileDetails extends React.Component {
  state = {
    favorites: [],
    studiosArr: [],
    instructors: [],
    locations: [],
    instructorFavorites: []
  }

  getSpinClass = (userClass) => {
    if (this.props.spinClasses.length !== 0) {
      let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === userClass.spin_class_id)
      return spinClass.time
    }
  }

  getStudioNameForCard = (userClass) => {
    if (this.props.spinClasses.length !== 0 && this.state.studiosArr.length !== 0) {
      let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === userClass.spin_class_id)
      let studio = this.state.studiosArr.find(studio => studio.id === spinClass.studio_id)
      return studio.name
    }
  }

  getStudioLogo = (userClass) => {
    if (this.props.spinClasses.length !== 0 && this.state.studiosArr.length !== 0) {
      let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === userClass.spin_class_id)
      let studio = this.state.studiosArr.find(studio => studio.id === spinClass.studio_id)
      return studio.logo
    }
  }

  getStudioLogoFav = (favorite) => {
    if (this.state.studiosArr.length !== 0 && this.state.studiosArr.length !== 0) {
      let studio = this.state.studiosArr.find(studio => studio.id === favorite.studio_id)
      return studio.logo
    }
  }

  getInstructorForCard = (userClass) => {
    if (this.props.spinClasses.length !== 0 && this.state.instructors.length !== 0) {
      let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === userClass.spin_class_id)
      let instructor = this.state.instructors.find(instructor => instructor.id === spinClass.instructor_id)
      return instructor.name
    }
  }

  getInstructorPhoto = (favorite) => {
    if (this.state.instructors.length !== 0) {
      let instructor = this.state.instructors.find(instructor => instructor.id === favorite.instructor_id)
      return instructor.profile_pic
    }
  }

  getLocationForCard = (userClass) => {
    if (this.props.spinClasses.length !== 0 && this.state.locations.length !== 0) {
      let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === userClass.spin_class_id)
      let location = this.state.locations.find(location => location.id === spinClass.location_id)
      return location.address
    }
  }

  convertUTCDateToLocalDate = date => {
    var dateFormat = new Date(date)
    var newDate = new Date(dateFormat.getTime()+dateFormat.getTimezoneOffset()*60*1000);
    return newDate;
  }

  getClassDateAndTime = (userClass) => {
    if (this.props.spinClasses.length !== 0) {
      let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === userClass.spin_class_id)
      let date = moment(spinClass.start.toString()).format('llll').slice(0, 17)
      let start = this.convertUTCDateToLocalDate(spinClass.start)
      let end = this.convertUTCDateToLocalDate(spinClass.end)
      let startSliced = moment(start.toString()).format('llll').slice(17, 30)
      let endSliced = moment(end.toString()).format('llll').slice(17, 30)
      return (
        <div>
          <h2>{date} ({startSliced} - {endSliced} )</h2>
        </div>
      )
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
              <span>
                <img className="profile-studio-logo" src={this.getStudioLogo(userClass)}/>
              </span>
              <div className="profile-card-text">
                <h1 className="longer-strong">{this.getStudioNameForCard(userClass)}: {this.getSpinClass(userClass)} </h1>
                {this.getClassDateAndTime(userClass)}
                <h2>{this.getInstructorForCard(userClass)}</h2>
                <p className="reservation-card-header"> {this.getLocationForCard(userClass)} </p>
                <p className="reservation-card-header">Bike: {userClass.bike} </p>
              </div>
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

  getMyInstructorFavorites = () => {
    InstructorFavoriteAdapter.getInstructorFavorites()
    .then(favorites => {
      let filtered = favorites.filter(favorite => favorite.user_id === this.props.currentUser.id)
      this.setState({
        instructorFavorites: filtered
      })
    })
  }


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

  removeInstructorFavorite = favorite => {
    InstructorFavoriteAdapter.destroyInstructorFavorite(favorite)
    .then(res =>{
      this.getMyInstructorFavorites()
    })
  }

  getInstructorName = favorite => {
    let instructor = this.state.instructors.find(instructor => instructor.id === favorite.instructor_id)
    return instructor
  }

  renderInstructorFavorites = () => {
    if (this.state.instructorFavorites.length === 0) {
      this.getMyInstructorFavorites()
    }
    if (this.state.instructors.length === 0) {
      this.getInstructors()
    }

    else if (this.state.instructorFavorites.length !== 0 && this.state.instructors.length !== 0) {
      return this.state.instructorFavorites.map(favorite => {
        let instructor = this.getInstructorName(favorite)
        return (
          <div>
            <span onClick={() => this.removeInstructorFavorite(favorite)}>
              <img className="remove-fav" src={remove} alt="remove" />
            </span>
            <div className="favorites-cards" onClick={() => this.redirectoInstructorShow(favorite)}>
              <span>
                <img className="profile-instructor-logo" src={this.getInstructorPhoto(favorite)}/>
                <br/>
              </span>
              <div className="profile-card-text">
                <h1 className="longer-strong">{instructor.name.toUpperCase()}</h1>
                <p className="reservation-card-header"><strong>TEACHING STYLE: </strong>{instructor.teaching_style}</p>
                <p className="reservation-card-header"><strong>FUN FACT: </strong>{instructor.fun_fact}</p>
                <br/>
              </div>
            </div>
          </div>
        )
      })
    }
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
              <span>
                <img className="profile-studio-logo" src={this.getStudioLogoFav(favorite)}/>
                <br/>
              </span>
              <div className="profile-card-text">
                <h1 className="longer-strong">{studio.name.toUpperCase()}</h1>
                <p className="reservation-card-header"><strong>BIO: </strong>{studio.bio}</p>
                <p className="reservation-card-header"><strong>WEBSITE: </strong><a className="link" href={studio.website}>{studio.website}</a></p>
                <br/>
              </div>
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

  redirectoInstructorShow = favorite => {
    let instructor = this.state.instructors.find(instructor => instructor.id === favorite.instructor_id)
    let path = instructor.name.toLowerCase().replace(" ","_")
    this.props.history.push(`/instructors/${path}`)
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
    return (
      <div className="profile-details-container">
        <ProfileNav />
        {this.props.myReservations
          ?
          <div>
            <h1 className="profile-details-strong">MY RESERVATIONS </h1>
            {this.getMyReservations()}
          </div>
          :
          null
        }
        {this.props.myFavorites
          ?
          <div>
            <h1 className="profile-details-strong"> MY FAVORITES </h1>
            <div>
            <h1 className="strong-favorites">STUDIOS: </h1>
            {this.renderFavorites()}
            </div>

            <div>
            <br/>
            <h1 className="strong-favorites">INSTRUCTORS: </h1>
            {this.renderInstructorFavorites()}
            </div>
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
