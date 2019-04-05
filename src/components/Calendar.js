import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'


const localizer = BigCalendar.momentLocalizer(moment)

const views=['week']

class Calendar extends React.Component {
  static defaultProps = {
    elementProps: {},
    popup: false,
    toolbar: true,
    view: [views.WEEK],
    step: 30,
    length: 30,

    drilldownView: views.DAY,

    titleAccessor: 'title',
    tooltipAccessor: 'title',
    allDayAccessor: 'allDay',
    startAccessor: 'start',
    endAccessor: 'end',
    resourceAccessor: 'resourceId',

    resourceIdAccessor: 'id',
    resourceTitleAccessor: 'title',

    longPressThreshold: 250,
    getNow: () => new Date(),
  }

  render() {
    return (
      <div>
        <BigCalendar
          localizer={localizer}
          events={this.props.spinClasses}
          startAccessor="start"
          endAccessor="end"
          drilldownView="agenda"
        />
      </div>
    )
  }
}
export default Calendar
