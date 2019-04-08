import React from "react"
import like from '../images/like.png'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import StarRatingComponent from 'react-star-rating-component';
import ReviewAdapter from '../apis/ReviewAdapter'
import wheel from '../images/cyclewheel.png'

class SearchResults extends React.Component {
  state = {
    reviews: []
  }
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

  getAvgRating = () => {
    if (this.state.reviews.length !== 0) {
      let myReviews = this.state.reviews.filter(review => review.studio_id === this.props.location.studio_id)
      let ratings = []
      myReviews.map(review => {
        ratings.push(review.rating)
      })
      let sum = 0
      for (var i = 0; i < ratings.length; i++) {
        sum += ratings[i]
      }
      return sum / ratings.length
    }
  }

  directToReservation = () => {
    this.props.history.push('/reserve')
  }

  componentDidMount(){
    ReviewAdapter.getReviews()
    .then(reviews => {
      this.setState({
        reviews
      })
    })
  }

  render() {
    return (
      <div className="">
        {this.props !== undefined
          ?
          <div>
            <span className= "favorite-search" onClick={this.directToReservation}>
              <img className="wheel" src={wheel} alt="favorite" />
              <span className="favorite-text-search">
                <h1>BOOK A CLASS</h1>
              </span>
            </span>
          <div className="search-result-card" onClick={() => this.handleOnClick(this.props.location)}>
            <h2>{this.getStudioName()} {this.props.location.name}</h2>
            <StarRatingComponent
              className="stars"
              name="rate"
              starCount={5}
              value={this.getAvgRating()}
            />
            <p>{this.props.location.address}</p>
            <p>{this.props.location.phone_number}</p>
            <p>{this.props.location.email}</p>
          </div>
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
    reviews: state.reviews
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    setSelectedStudio: (studio) => dispatch({ type: "SET_SELECTED_STUDIO", payload: studio})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(SearchResults)
