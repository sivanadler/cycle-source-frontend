import React from "react"
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import 'react-big-scheduler/lib/css/style.css'
import CalendarDay from './CalendarDay'
import Calendar from './Calendar'
import moment from 'moment'


class ScheduleContainer extends React.Component {

  render() {
    return (
      <div className="schedule-container">
        <h1>BOOK YOUR RIDE</h1>

        <Calendar />
      </div>
    )
  }
}
export default ScheduleContainer
