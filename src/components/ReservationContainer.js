import React from "react"
import HamburgerNav from './HamburgerNav'
import ScheduleContainer from './ScheduleContainer'
import Header from './Header'


const ReservationContainer = (props) => {
  return (
    <div>
      <div className="top">
        <span>
          <HamburgerNav />
        </span>
        <span>
          <Header />
        </span>
        <div>
        <h1 className="search-header">CYCLE SOURCE</h1>
        </div>
      </div>
      <ScheduleContainer history={props.history}/>
    </div>
  )
}

export default ReservationContainer
