import React from "react"
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import 'react-big-scheduler/lib/css/style.css'
import CalendarDay from './CalendarDay'
import Calendar from './Calendar'
import moment from 'moment'
import SpinClassAdapter from '../apis/SpinClassAdapter'


class ScheduleContainer extends React.Component {
  state = {
    spinClasses: []
  }

  componentDidMount(){
    SpinClassAdapter.getSpinClasses()
    .then(spinClasses => {
      this.setState({ spinClasses })
    })
  }

  render() {
    return (
      <div className="schedule-container">
        <h1>BOOK YOUR RIDE</h1>

        <Calendar spinClasses={this.state.spinClasses}/>
      </div>
    )
  }
}
export default ScheduleContainer
