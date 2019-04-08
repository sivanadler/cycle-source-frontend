import React from "react";
import { connect } from 'react-redux'
import SpinClassAdapter from '../apis/SpinClassAdapter'
import InstructorAdapter from '../apis/InstructorAdapter'

class InstructorsDiv extends React.Component {
  state = {
    spinClasses: [],
    instructors: [],
    getInstructors: true,
    getSpinClasses: true
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
          <div className="instructor-card">
            <img src="https://instructors.flywheelsports.com/510/Emily_Fayette_dfac98143c2a4f45b3d9e8b5f272feb950e141f7.jpg" alt="profile-picture" className="instructor-pic"/>
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

  render() {
    return (
      <div className="instructors-div">
        {this.renderInstructors()}


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
