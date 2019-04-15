import React from "react";
import { connect } from 'react-redux'
import SpinClassAdapter from '../apis/SpinClassAdapter'
import InstructorAdapter from '../apis/InstructorAdapter'
import InstructorShowContainer from './InstructorShowContainer'
class InstructorsDiv extends React.Component {
  state = {
    spinClasses: [],
    instructors: [],
    getInstructors: true,
    getSpinClasses: true,
    instructorShow: false
  }

  getInstructors = () => {
    let filteredInstructors
    InstructorAdapter.getInstructors()
    .then(instructors => {
      this.getSpinClasses()
      this.setState({
        instructors: instructors,
        getInstructors: false
      })
    })
  }


  getSpinClasses = () => {
    SpinClassAdapter.getSpinClasses()
    .then(spinClasses => {
      this.setState({
        spinClasses: spinClasses,
        getSpinClasses: false
      })
    })
  }

  removeDups = instructors => {
    let unique = {};
    instructors.forEach(function(i) {
      if(!unique[i.id]) {
        unique[i.id] = true;
      }
    });
    return Object.keys(unique)
  }

  renderInstructors = () => {
    if (!this.state.getInstructors && !this.state.getSpinClasses) {
      let filteredSpinClasses = this.state.spinClasses.filter(spinClass =>  spinClass.studio_id === this.props.studio.id)
      let instructors = []
      filteredSpinClasses.forEach(spinClass => {
        let instructor_id = spinClass.instructor_id
        this.state.instructors.find(instructor => {
          if (instructor.id === instructor_id) {
            instructors.push(instructor)
          }
        })
      })
      let ids = this.removeDups(instructors)
      let filteredInstructors = []
      ids.map(id => {
        this.state.instructors.find(instructor => {
          if (instructor.id === parseInt(id)) {
            filteredInstructors.push(instructor)
          }
        })
      })
      return filteredInstructors.map(instructor => {
        return (
          <div className="instructor-card" onClick={() => this.handleRedirectToInstructors(instructor)}>
            <img src={instructor.profile_pic} alt="profile-picture" className="instructor-pic"/>
            <h1 >{instructor.name}</h1>
          </div>
        )
      })
    } else if (this.state.getSpinClasses) {
      this.getSpinClasses()
    } else if (this.state.getInstructors) {
      this.getInstructors()
    }
  }

  handleRedirectToInstructors = instructor => {
    let pathName = instructor.name.toLowerCase().replace(" ", "_")
    this.props.history.push(`/instructors/${pathName}`)
  }

  render() {
    return (
      <div>
        <h1 className="header-show">INSTRUCTORS</h1>
        <div className="instructors-div">
          {this.renderInstructors()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    spinClasses: state.spinClasses,
    instructors: state.instructors
  }
}

export default connect(mapStateToProps)(InstructorsDiv)
