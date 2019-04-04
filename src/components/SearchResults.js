import React from "react"
import like from '../images/like.png'
import { connect } from 'react-redux'


class SearchResults extends React.Component {

  getStudioName = () => {
    if (this.props.studios.length !== 0) {
      let studio = this.props.studios.find(studio => studio.id === this.props.location.studio_id)
      return studio.name
    }
  }

  render() {
    return (
      <div className="">
        {this.props !== undefined
          ?
          <div className="search-result-card">
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

export default connect(mapStateToProps)(SearchResults)
