import React from "react"
import like from '../images/like.png'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

class SearchResults extends React.Component {

  getStudioName = () => {
    if (this.props.studios.length !== 0) {
      let studio = this.props.studios.find(studio => studio.id === this.props.location.studio_id)
      return studio.name
    }
  }

  handleOnClick = location => {
    let studio = this.props.studios.find(studio => studio.id === location.studio_id)
    let studioName = studio.name.toLowerCase().replace(" ","_")
    this.props.setSelectedStudio(studio)
    this.props.history.push(`/${studioName}`)
  }

  render() {
    return (
      <div className="">
        {this.props !== undefined
          ?
          <div className="search-result-card" onClick={() => this.handleOnClick(this.props.location)}>
            <h2>{this.getStudioName()} {this.props.location.name}</h2>
            <p>Rating: **** </p>
            <p>{this.props.location.address}</p>
            <p>{this.props.location.phone_number}</p>
            <p>{this.props.location.email}</p>
          </div>
          :
          null
        }
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    studios: state.studios,
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    setSelectedStudio: (studio) => dispatch({ type: "SET_SELECTED_STUDIO", payload: studio})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(SearchResults)
