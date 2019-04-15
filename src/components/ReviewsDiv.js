import React from "react";
import { connect } from 'react-redux'
import StarRatingComponent from 'react-star-rating-component';
import ReviewAdapter from '../apis/ReviewAdapter'
import UserAdapter from '../apis/UserAdapter'
import cycle from '../images/cycle.png'
class ReviewsDiv extends React.Component {
  state = {
    rating: 1,
    review: "",
    review_title: "",
    notFilledOut: false
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
    if (this.state.review === "" || this.state.review_title === "") {
      this.setState({
        notFilledOut: true
      })
    } else {
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
        review_title: "",
        notFilledOut: false,
      })
      this.getReviews()
    })}
  }

  renderForm = () => {
    const { rating } = this.state

    return (
      <div className="form">
      <h1 className="form-header">REVIEW FOR {this.props.studio.name.toUpperCase()}</h1>
        <form onSubmit={this.handleSubmit} className="form-content">
          {this.state.notFilledOut ? <p className="invalid-text">These Fields Are All Required. Please Try Again.</p> : null}
          <label className="review-form-label">Rating:</label>
          <StarRatingComponent
            name="rate"
            starCount={5}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
          <br/><br/>
          <label className="review-form-label">Title:</label>
          <input type="textarea" name="review_title" value={this.state.review_title} onChange={this.handleOnChange} className="review-input" placeholder="Review Title"/>
          <br/><br/>
          <label className="review-form-label">Review:</label>
          <input className="review-input" name="review" value={this.state.review} onChange={this.handleOnChange} placeholder="Write Your Review Here"/>
          <br/><br/>
          <input className="login-btn" type="submit" value="Submit Your Review" />
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
    let filteredReviews = this.props.reviews.filter(review => review.studio_id === this.props.studio.id)
    if (filteredReviews.length !== 0) {
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
    } else {
      return <h1>This Studio Has No Reviews. Be The First ?</h1>
    }
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
          this.props.currentUser && this.props.currentUser.role === "rider"
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
          null
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
