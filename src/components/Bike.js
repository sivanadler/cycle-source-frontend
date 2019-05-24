import React from "react";
import { connect } from 'react-redux'

//this component represents each bike on the booking map
class Bike extends React.Component {
  getInstructorInfo = () => {
    if (this.props.bookThisClass) {
      let instructor = this.props.instructors.find(instructor => instructor.id === this.props.bookThisClass.instructor_id)
      return <h1>{instructor.name}</h1>
    }
  }

  handleOnClick = e => {
    if (this.props.className === 'reserved-bike') {
      return null
    }
    if (this.props.className === 'my-reserved-bike') {
      return null
    }
    if (this.props.editBike) {
      let selectedBike = parseInt(e.target.innerText)
      this.props.selectChangedBike(selectedBike)
    } else {
      let selectedBike = parseInt(e.target.innerText)
      this.props.selectBike(selectedBike)
    }
  }

  render() {
    return (
      <div className={this.props.className} onClick={this.handleOnClick}>
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
    selectBike: (bike) => dispatch({ type: "SET_SELECTED_BIKE", payload: bike}),
    selectChangedBike: (bike => dispatch({ type: "SET_SELECTED_CHANGED_BIKE", payload: bike}))
  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(Bike)
