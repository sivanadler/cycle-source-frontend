import React from "react"
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import 'react-big-scheduler/lib/css/style.css'
import CalendarDay from './CalendarDay'
import Calendar from './Calendar'
import moment from 'moment'
import { connect } from 'react-redux'
import BookingMap from './BookingMap'
import LocationAdapter from '../apis/LocationAdapter'

class ScheduleContainer extends React.Component {

  componentDidMount(){
    LocationAdapter.getLocations()
    .then(locations => {
      this.props.storeLocations(locations)})
  }

  render() {
    console.log(this.props.history)
    return (
      <div className="schedule-container">
        {
          this.props.bookThisClass
          ?
          <BookingMap history={this.props.history}/>
          :
          <Calendar locations={this.props.locations}/>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    bookThisClass: state.bookThisClass,
    locations: state.locations
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    storeLocations: (array) => dispatch({ type: "GET_LOCATIONS", payload: array }),
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(ScheduleContainer)
