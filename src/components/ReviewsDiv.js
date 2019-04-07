import React from "react";
import { connect } from 'react-redux'
import StarRatingComponent from 'react-star-rating-component';
import ReviewAdapter from '../apis/ReviewAdapter'
import UserAdapter from '../apis/UserAdapter'

class ReviewsDiv extends React.Component {
  state = {
    rating: 1,
    review: "",
    review_title: ""
  }

  renderReviewForm = () => {
    this.props.toggleReviewForm()
  }

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({rating: nextValue});
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    let rating = this.state.rating
    let review = this.state.review
    let review_title = this.state.review_title
    let studio_id = this.props.studio.id
    let user_id = this.props.currentUser.id
    ReviewAdapter.createReview(rating, review, review_title, studio_id, user_id)
    .then(review => {
      this.props.saveReview(review)
      this.setState({
        rating: 1,
        review: "",
        review_title: ""
      })
      this.getReviews()
    })
  }

  renderForm = () => {
    const { rating } = this.state

    return (
      <div>
      <h1>Write A Review For {this.props.studio.name}</h1>
        <form onSubmit={this.handleSubmit}>
          <h2>Review Title:</h2>
          <input type="textarea" name="review_title" value={this.state.review_title} onChange={this.handleOnChange}/>
          <br/>
          <h2>Rating: {rating}</h2>
          <StarRatingComponent
            name="rate"
            starCount={5}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
          <br/>
          <h2>Review Text:</h2>
          <input type="textarea" name="review" value={this.state.review} onChange={this.handleOnChange}/>
          <br/>
          <input type="submit" value="Submit Your Review" />
        </form>
      </div>

    )
  }

  getUsers = () => {
    UserAdapter.getUsers()
    .then(users => {
      this.props.setUsers(users)
    })
  }

  getUserName = review => {
    if (this.props.users.length !== 0) {
      let foundUser = this.props.users.find(user => user.id === review.user_id)
      return foundUser.username
    } else {
      return null
    }
  }

  getReviews = () => {
    let filteredReviews = this.props.reviews[0].filter(review => review.studio_id === this.props.studio.id)
    return filteredReviews.map(review => {
      return (
        <div className="review-card">
          <h1>{review.review_title}</h1>
          <h3>Posted by: {this.getUserName(review)}</h3>
          <p>Rating:
          <StarRatingComponent
            name="rate"
            starCount={5}
            value={review.rating}
          />
          </p>
          <p>{review.review_text}</p>
        </div>
      )
    })
  }

  componentDidMount(){
    ReviewAdapter.getReviews()
    .then(reviews => {
      this.props.setReviews(reviews)
    })
    this.getUsers()
  }

  render() {
    const { rating } = this.state

    return (
      <div className="reviews-div">
        <h1 className="header">REVIEWS</h1>
        <div className="button-div">
        {
          this.props.currentUser.role === "rider"
          ?
          <button className="post-review-btn" onClick={this.renderReviewForm}>Post Review</button>
          :
          null
        }

        </div>
        {
          this.props.reviewForm
          ?
          this.renderForm()
          :
          null
        }

        {
          this.props.reviews.length !== 0
          ?
          this.getReviews()
          :
          <h1>This Studio Has No Reviews. Be The First ?</h1>
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    locations: state.locations,
    reviews: state.reviews,
    reviewForm: state.reviewForm,
    currentUser: state.currentUser,
    users: state.users
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    toggleReviewForm: () => dispatch({ type: "TOGGLE_REVIEW_FORM"}),
    setReviews: (array) => dispatch({ type: "SET_REVIEWS", payload: array}),
    setUsers: (array) => dispatch({ type: "STORE_USERS", payload: array}),
    saveReview: (review) => dispatch({ type: "SAVE_REVIEW", payload: review})
  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(ReviewsDiv)
