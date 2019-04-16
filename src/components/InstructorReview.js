import React from "react";
import { connect } from 'react-redux'
import StarRatingComponent from 'react-star-rating-component';
import UserAdapter from '../apis/UserAdapter'
import InstructorReviewAdapter from '../apis/InstructorReviewAdapter'
import HamburgerNav from './HamburgerNav'
import Header from './Header'

class InstructorReview extends React.Component {
  state = {
    rating: 1,
    review: "",
    review_title: ""
  }

  handleSubmit = e => {
    e.preventDefault()
    let rating = this.state.rating
    let review = this.state.review
    let review_title = this.state.review_title
    let instructor_id = this.props.instructor.id
    let user_id = this.props.currentUser.id
    InstructorReviewAdapter.createInstructorReview(rating, review, review_title, instructor_id, user_id)
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

  renderForm = () => {
    const { rating } = this.state

    return (
      <div className="form">
      <h1 className="form-header">WRITE A REVIEW FOR {this.props.instructor.name.toUpperCase()}</h1>
        <form onSubmit={this.handleSubmit} className="form-content">
          <h1 className="review-form-label">RATING:</h1>
          <StarRatingComponent
            name="rate"
            starCount={5}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
          <br/><br/>
          <h1 className="review-form-label">TITLE:</h1>
          <input type="textarea" name="review_title" value={this.state.review_title} onChange={this.handleOnChange} className="review-input" placeholder="Write your title here"/>
          <br/><br/>
          <h1 className="review-form-label">REVIEW:</h1>
          <input type="textarea" name="review" value={this.state.review} onChange={this.handleOnChange} className="review-input" placeholder="Write your review here"/>
          <br/><br/>
          <input className="login-btn" type="submit" value="Submit Your Review" />
        </form>
      </div>
    )
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
    let filteredReviews = this.props.instructorReviews.filter(review => review.instructor_id === this.props.instructor.id)
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
      return <h1 className="no-reviews">This Instructor Has No Reviews. Be The First ?</h1>
    }
  }

  getUsers = () => {
    UserAdapter.getUsers()
    .then(users => {
      this.props.setUsers(users)
    })
  }

  getButtonToAddReview = () => {
    return (
      <button className="post-review-btn" onClick={this.renderReviewForm}>Post Review</button>
    )
  }

  componentDidMount(){
    InstructorReviewAdapter.getInstructorReviews()
    .then(reviews => {
      this.props.setInstructorReviews(reviews)
    })
    this.getUsers()
  }

  render() {
    return (
      <div className="reviews-div">
        <h1 className="header">REVIEWS</h1>
        <div className="button-div">
        {
          this.props.currentUser && this.props.currentUser.role === "rider"
          ?
          this.getButtonToAddReview()
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
          this.props.instructorReviews && this.props.instructorReviews.length !== 0
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
    instructorReviews: state.instructorReviews,
    reviewForm: state.reviewForm,
    users: state.users
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    setCurrentUser: (user) => dispatch({ type: "SET_CURRENT_USER", payload: user}),
    toggleReviewForm: () => dispatch({ type: "TOGGLE_REVIEW_FORM"}),
    setInstructorReviews: (array) => dispatch({ type: "SET_INSTRUCTOR_REVIEWS", payload: array}),
    setUsers: (array) => dispatch({ type: "STORE_USERS", payload: array}),
    saveReview: (review) => dispatch({ type: "SAVE_INSTRUCTOR_REVIEW", payload: review})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(InstructorReview)
