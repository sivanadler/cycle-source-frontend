import React from "react";
import InstructorAdapter from '../apis/InstructorAdapter'
import heart from '../images/heart.png'
import FavoriteAdapter from '../apis/FavoriteAdapter'
import InstructorProfile from './InstructorProfile'

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
     this.setState({
       selectedInstructor: instructor
     })
  }


  //make sure this works
  handleFavorite = () => {
    if (this.state.favorited) {
      let favorite = this.state.favorites.find(favorite => favorite.studio_id === this.props.selectedStudio.id)
      FavoriteAdapter.destroyFavorite(favorite)
      .then(res =>{
        this.getMyFavorites()
        this.setState({
          favorited: false
        })
      })
    } else {
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
  }

  componentDidMount(){
    InstructorAdapter.getInstructors()
    .then(instructors => {
      this.getInstructor(instructors)
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
      {
          this.state.selectedInstructor
          ?
          <div>
            <div className="studio-show-header">
              <h1 className="studio-head">{this.state.selectedInstructor.name}</h1>
              <span className={this.state.favorited ? "favorited" : "favorite"} onClick={this.handleFavorite}>
                <img className="heart" src={heart} alt="favorite" />
                <span className="favorite-text">
                  <h1>FAVORITE</h1>
                </span>
              </span>
            </div>
            <InstructorProfile instructor={this.state.selectedInstructor}/>
          </div>
        :
        null
      }
      </div>
    )
  }
}

export default InstructorShowContainer
