import React from "react";
import { connect } from 'react-redux'
import InstructorAdapter from '../apis/InstructorAdapter'
import heart from '../images/heart.png'
import star from '../images/star.png'
import InstructorFavoriteAdapter from '../apis/InstructorFavoriteAdapter'
import InstructorProfile from './InstructorProfile'
import InstructorReview from './InstructorReview'
import HamburgerNav from './HamburgerNav'
import Header from './Header'
import InstructorCalendar from './InstructorCalendar'

class InstructorShowContainer extends React.Component {

  state = {
    selectedInstructor: null,
    favorited: false,

  }

  getInstructor = instructors => {
    let instructorName
      let pathname = this.props.history.location.pathname
      let instructor = instructors.find(instructor => {
        instructorName = instructor.name.toLowerCase().replace(" ", "_")
       if (pathname.includes(instructorName)) {
         return instructor
       }
     })
     console.log(instructor)
     this.setState({
       selectedInstructor: instructor
     })
     this.getMyFavorites()
  }


  //make sure this works
  handleFavorite = () => {
    if (this.state.favorited) {
      let favorite = this.state.favorites.find(favorite => favorite.instructor_id === this.state.selectedInstructor.id)
      InstructorFavoriteAdapter.destroyInstructorFavorite(favorite)
      .then(res =>{
        this.getMyFavorites()
        this.setState({
          favorited: false
        })
      })
    } else {
      let props = this.props
      let currentUser_id = this.props.currentUser.id
      let instructor_id = this.state.selectedInstructor.id
      InstructorFavoriteAdapter.createInstructorFavorite(instructor_id, currentUser_id)
      .then(favorite => {
        console.log(favorite)
          this.setState({
            favorited: true
          })
      })
    }
  }

  getAverageRating = () => {
    if (this.props.instructorReviews && this.props.instructorReviews.length !== 0) {
      let myReviews = this.props.instructorReviews.filter(review => review.instructor_id === this.state.selectedInstructor.id)
      let ratings = []
      myReviews.map(review => {
        ratings.push(review.rating)
      })
      let sum = 0
      for (var i = 0; i < ratings.length; i++) {
        sum += ratings[i]
      }
      if (sum === 0) {
        return 0
      } else {
        return sum / ratings.length
      }
    }
  }

  getCurrentUser = () => {
    const jwt = localStorage.getItem('jwt')
    const jwtInstructor = localStorage.getItem('jwtInstructor')
    if (jwt) {
      fetch("http://localhost:3000/api/v1/auto_login", {
        headers: {
          "Authorization": jwt
        }
      })
        .then(res => res.json())
        .then(response => {
          if (response.errors) {
            alert(response.errors)
          } else {
            this.props.setCurrentUser(response.user)
          }
        })
    } else if (jwtInstructor) {
      fetch("http://localhost:3000/api/v1/instructor_auto_login", {
        headers: {
          "Authorization": jwtInstructor
        }
      })
        .then(res => res.json())
        .then(response => {
          if (response.errors) {
            alert(response.errors)
          } else {
            this.props.setCurrentUser(response.instructor)
          }
        })
    }
  }
  getMyFavorites = () => {
    if (this.state.selectedInstructor) {
      InstructorFavoriteAdapter.getInstructorFavorites()
      .then(favorites => {
        let favs = favorites.find(favorite => favorite.instructor_id === this.state.selectedInstructor.id)
        if (favs) {
          this.setState({
            favorites: favorites,
            favorited: true
          })
        }
      })
    }
  }

  componentDidMount(){
    this.getCurrentUser()
    InstructorAdapter.getInstructors()
    .then(instructors => {
      this.getInstructor(instructors)
    })
  }

  render() {
    return (
      <div>
      {
          this.state.selectedInstructor
          ?
          <div>
            <span>
              <HamburgerNav />
            </span>
            <span>
              <Header />
            </span>
            <h1 className="search-header">CYCLE SOURCE</h1>
            <div className="studio-show-header">
              <h1 className="studio-head">{this.state.selectedInstructor.name}</h1>
              <span className={this.state.favorited ? "favorited" : "favorite"} onClick={this.handleFavorite}>
                <img className="heart" src={heart} alt="favorite" />
                <span className="favorite-text">
                  <h1>FAVORITE</h1>
                </span>
              </span>
              <span className="favorite">
                <img className="star" src={star} alt="favorite" />
                <span className="favorite-text">
                  <h1>AVERAGE RATING: {this.getAverageRating()}</h1>
                </span>
              </span>
            </div>
            <InstructorProfile instructor={this.state.selectedInstructor}/>
            <InstructorReview instructor={this.state.selectedInstructor} currentUser={this.props.currentUser}/>
            <InstructorCalendar instructor={this.state.selectedInstructor}/>
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
    currentUser: state.currentUser,
    instructorReviews: state.instructorReviews,
    locations: state.locations,
    studios: state.studios,
    instructors: state.instructors
  }
}

const mapDispatchtoProps = dispatch => {
  return{
    setCurrentUser: (user) => dispatch({ type: "SET_CURRENT_USER", payload: user}),
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(InstructorShowContainer)
