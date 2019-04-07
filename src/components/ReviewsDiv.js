import React from "react";
import { connect } from 'react-redux'

class ReviewsDiv extends React.Component {

  renderReviewForm = () => {
    this.props.toggleReviewForm()
  }

  renderForm = () => {
    return (
      <div>
      <h1>Write A Review For {this.props.studio.name}</h1>
        <form>
          <input type="text" name="review" />
        </form>
      </div>

    )
  }

  render() {
    return (
      <div className="reviews-div">
        <h1 className="header">REVIEWS</h1>
        <div className="button-div">
          <button className="post-review-btn" onClick={this.renderReviewForm}>Post Review</button>
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
          this.props.reviews.map(location => {
            if (location.studio_id === this.props.studio.id) {
              return (
                <div className="locations-card">
                </div>
              )
            }
          })
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
    reviewForm: state.reviewForm
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    toggleReviewForm: () => dispatch({ type: "TOGGLE_REVIEW_FORM"})
  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(ReviewsDiv)
