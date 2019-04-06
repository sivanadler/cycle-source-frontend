import React from "react"
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import 'react-big-scheduler/lib/css/style.css'
import CalendarDay from './CalendarDay'
import Calendar from './Calendar'
import moment from 'moment'
import { connect } from 'react-redux'
import BookingMap from './BookingMap'

class ScheduleContainer extends React.Component {

  render() {
    console.log(this.props.bookThisClass);
    return (
      <div className="schedule-container">
        {
          this.props.bookThisClass
          ?
          <BookingMap />
          :
          <Calendar />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    bookThisClass: state.bookThisClass
  }
}
export default connect(mapStateToProps)(ScheduleContainer)
