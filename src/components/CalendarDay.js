import React from "react";
import moment from 'moment'


class CalendarDay extends React.Component {

  render() {
    return (
      <div className="calendar-day">
        <h1>{this.props.day}</h1>
        <h1></h1>
      </div>
    )
  }
}
export default CalendarDay
