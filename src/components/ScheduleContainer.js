import React from "react"
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import 'react-big-scheduler/lib/css/style.css'
import CalendarDay from './CalendarDay'
import moment from 'moment'


class ScheduleContainer extends React.Component {

  render() {
    return (
      <div className="schedule-container">
        <h1>BOOK YOUR RIDE</h1>
        <CalendarDay
          day={moment().format('dddd')}
        />
        <CalendarDay
          day={moment().add(1, 'days').format('dddd')}
        />
        <CalendarDay
          day={moment().add(2, 'days').format('dddd')}
        />
        <CalendarDay
          day={moment().add(3, 'days').format('dddd')}
        />
        <CalendarDay
          day={moment().add(4, 'days').format('dddd')}
        />
        <CalendarDay
          day={moment().add(5, 'days').format('dddd')}
        />
        <CalendarDay
          day={moment().add(6, 'days').format('dddd')}
        />
      </div>
    )
  }
}
export default ScheduleContainer
