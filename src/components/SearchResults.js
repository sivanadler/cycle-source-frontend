import React from "react"
import like from '../images/like.png'
import { connect } from 'react-redux'
import StudioAdapter from '../apis/StudioAdapter'


class SearchResults extends React.Component {
  state = {
    studios: []
  }

  getStudioName = () => {
    if (this.state.studios.length !== 0) {
      let studio = this.state.studios.find(studio => studio.id === this.props.location.studio_id)
      return studio.name
    }
  }

  componentDidMount(){
    StudioAdapter.getStudios()
    .then(studios => {
      this.setState({studios})
    })
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
