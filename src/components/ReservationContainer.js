import React from "react"
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import 'react-big-scheduler/lib/css/style.css'
import moment from 'moment'
import HamburgerNav from './HamburgerNav'


const ReservationContainer = (props) => {
  return (
    <div>
      <HamburgerNav />
      <Scheduler >
        <SchedulerData />
      </Scheduler >
    </div>
  )
}

export default ReservationContainer
