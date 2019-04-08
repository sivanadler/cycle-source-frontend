import React from "react"
import ProfileNav from './ProfileNav'
import UserClassAdapter from '../apis/UserClassAdapter'
import SpinClassAdapter from '../apis/SpinClassAdapter'
import FavoriteAdapter from '../apis/FavoriteAdapter'
import StudioAdapter from '../apis/StudioAdapter'
import remove from '../images/remove.png'
import { connect } from 'react-redux'

class ProfileDetails extends React.Component {
  state = {
    favorites: [],
    studiosArr: []
  }

  getSpinClass = (userClass) => {
    if (this.props.spinClasses.length !== 0) {
      let spinClass = this.props.spinClasses.find(spinClass => spinClass.id === userClass.spin_class_id)
      return spinClass.time
    }
  }

  getMyReservations = () => {
    if (this.props.userClasses.length !== 0 && this.props.currentUser) {
      let myUserClasses = this.props.userClasses.filter(userClass => userClass.user_id === this.props.currentUser.id)
      return myUserClasses.map(userClass => {
        if (userClass.bike !== 0 ) {
          return (<div className="my-reservations">
            <h1> {this.getSpinClass(userClass)} </h1>
            <h1>Bike: {userClass.bike} </h1>
          </div>
        )}
      })
    }
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

  componentDidMount(){
    UserClassAdapter.getUserClasses()
    .then(userClasses => this.props.getUserClasses(userClasses))
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
    studios: state.studios
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    getUserClasses: (userClasses) => dispatch ({ type: "GET_USER_CLASSES", payload: userClasses}),
    saveSpinClasses: (spinClasses) => dispatch ({ type: "SAVE_SPIN_CLASSES", payload: spinClasses})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(ProfileDetails)
