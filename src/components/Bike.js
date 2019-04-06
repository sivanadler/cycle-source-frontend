import React from "react";
import { connect } from 'react-redux'

class Bike extends React.Component {
  getInstructorInfo = () => {
    if (this.props.bookThisClass) {
      let instructor = this.props.instructors.find(instructor => instructor.id === this.props.bookThisClass.instructor_id)
      return <h1>{instructor.name}</h1>
    }
  }

  handleOnClick = e => {
    let selectedBike = parseInt(e.target.innerText)
    this.props.selectBike(selectedBike)
  }

  render() {
    return (
      <div className="bike" onClick={this.handleOnClick}>
        <h1>{this.props.number}</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    bookThisClass: state.bookThisClass,
    instructors: state.instructors
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    selectBike: (bike) => dispatch({ type: "SET_SELECTED_BIKE", payload: bike})
  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(Bike)
