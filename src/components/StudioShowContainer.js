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

class StudioShowContainer extends React.Component {
  state = {
    favorited: false
  }

  handleFavorite = () => {
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

  getSelectedStudio = () => {
    let path = this.props.history.location.pathname
    let truePath =  path.slice(1).replace("_", " ")
    StudioAdapter.getStudios()
    .then(studios => {
      let foundStudio = studios.find(studio => studio.name.toLowerCase() === truePath)
      this.props.setSelectedStudio(foundStudio)
    })
  }

  renderPage = () => {
    if (this.props.selectedStudio) {
      let selectedStudio = this.props.selectedStudio
      return (
        <div className="studio-show-header">
          <div>
            <span>
            <img className="studio-logo" src={logo} alt="logo" />
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
          </div>
          <LocationsDiv studio_id={selectedStudio.id}/>
          <ReviewsDiv studio={selectedStudio}/>
          <InstructorsDiv studio={selectedStudio}/>
        </div>
      )

    }
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
