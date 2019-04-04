import React from "react"
import HamburgerNav from './HamburgerNav'
import ScheduleContainer from './ScheduleContainer'


const ReservationContainer = (props) => {
  return (
    <div>
      <HamburgerNav />
      <h1 className="search-header">CYCLE SOURCE</h1>
      <ScheduleContainer />
    </div>
  )
}

export default ReservationContainer
