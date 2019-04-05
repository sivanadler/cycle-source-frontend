import React from "react"
import HamburgerNav from './HamburgerNav'
import ScheduleContainer from './ScheduleContainer'
import Header from './Header'


const ReservationContainer = (props) => {
  return (
    <div>
      <span>
        <HamburgerNav />
      </span>
      <span>
        <Header />
      </span>
      <h1 className="search-header">CYCLE SOURCE</h1>
      <ScheduleContainer />
    </div>
  )
}

export default ReservationContainer
