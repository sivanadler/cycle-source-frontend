import React from "react";
import { connect } from 'react-redux'

class BookingMap extends React.Component {

  render() {
    console.log(this.props.instructors);
    return (
      <div className="booking-map">
        <h1>BOOK YOUR RIDE: STEP 2</h1>
        <h2>{this.props.bookThisClass.title}</h2>
        <h2>{this.props.bookThisClass.start.toString()}</h2>
        <h3>Select an available bike from the map below to make your reservation.</h3>
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

  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(BookingMap)
