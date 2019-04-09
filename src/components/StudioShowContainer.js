import React from "react";
import { connect } from 'react-redux'
import LocationsDiv from './LocationsDiv'
import ReviewsDiv from './ReviewsDiv'
import InstructorsDiv from './InstructorsDiv'
import logo from '../images/flywheel.png'
import UserAdapter from '../apis/UserAdapter'
import FavoriteAdapter from '../apis/FavoriteAdapter'
import StudioAdapter from '../apis/StudioAdapter'
import heart from '../images/heart.png'
import HamburgerNav from './HamburgerNav'
import Header from './Header'
import wheel from '../images/cyclewheel.png'

class StudioShowContainer extends React.Component {
  state = {
    favorited: false,
    favorites: []
  }

  handleFavorite = () => {
    if (this.state.favorited) {
      let favorite = this.state.favorites.find(favorite => favorite.studio_id === this.props.selectedStudio.id)
      FavoriteAdapter.destroyFavorite(favorite)
      .then(res =>{
        this.getMyFavorites()
        this.setState({
          favorited: false
        })
      })
    } else {
      let props = this.props
      let currentUser_id = this.props.currentUser.id
      let studio_id = this.props.selectedStudio.id
      FavoriteAdapter.createFavorite(studio_id, currentUser_id)
      .then(favorite => {
          this.setState({
            favorited: true
          })
      })
    }
  }

  getSelectedStudio = () => {
    let path = this.props.history.location.pathname
    let truePath =  path.slice(1).replace("_", " ")
    StudioAdapter.getStudios()
    .then(studios => {
      let foundStudio = studios.find(studio => studio.name.toLowerCase() === truePath)
      this.props.setSelectedStudio(foundStudio)
    })
  }

  directToReservation = () => {
    this.props.history.push('/reserve')
  }

  renderPage = () => {
    if (this.props.selectedStudio) {
      let selectedStudio = this.props.selectedStudio
      return (
        <div>
          <div className="studio-show-header">
            <span>
            <img className="studio-logo" src={this.props.selectedStudio.logo} alt="logo" />
            </span>
            <span>
            <h1 className="studio-head">{selectedStudio.name}</h1>
            </span>
            <span className={this.state.favorited ? "favorited" : "favorite"} onClick={this.handleFavorite}>
              <img className="heart" src={heart} alt="favorite" />
              <span className="favorite-text">
                <h1>FAVORITE</h1>
              </span>
            </span>
            <span className= "favorite" onClick={this.directToReservation}>
              <img className="wheel" src={wheel} alt="favorite" />
              <span className="favorite-text">
                <h1>BOOK A CLASS</h1>
              </span>
            </span>
          </div>
          <LocationsDiv studio_id={selectedStudio.id}/>
          <ReviewsDiv studio={selectedStudio}/>
          <InstructorsDiv studio={selectedStudio}/>
        </div>
      )

    }
  }

  getMyFavorites = () => {
    FavoriteAdapter.getFavorites()
    .then(favorites => {
      let favs = favorites.find(favorite => favorite.studio_id === this.props.selectedStudio.id)
      if (favs) {
        this.setState({
          favorites: favorites,
          favorited: true
        })
      }
    })
  }

  componentDidMount(){
    this.getMyFavorites()
  }

  render() {
    return (
      <div>
        <span>
          <HamburgerNav />
        </span>
        <span>
          <Header />
        </span>
        <h1 className="search-header">CYCLE SOURCE</h1>
        {
          this.props.selectedStudio
          ?
          this.renderPage()
          :
          this.getSelectedStudio()
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    selectedStudio: state.selectedStudio,
    currentUser: state.currentUser
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    setUsers: (array) => dispatch({ type: "STORE_USERS", payload: array}),
    setSelectedStudio: (studio) => dispatch({ type: "SET_SELECTED_STUDIO", payload: studio})
  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(StudioShowContainer)
