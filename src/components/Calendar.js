import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import SpinClassAdapter from '../apis/SpinClassAdapter'


const localizer = BigCalendar.momentLocalizer(moment)

const views=['week', 'day', 'month']

class Calendar extends React.Component {
  state = {
    spinClasses: []
  }

  static defaultProps = {
    elementProps: {},
    popup: false,
    toolbar: true,
    view: [views.WEEK, views.MONTH, views.DAY],
    step: 30,
    length: 30,

    drilldownView: views.WEEK,

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

  componentDidMount(){
    SpinClassAdapter.getSpinClasses()
    .then(spinClasses => {
      this.getSpinClasses(spinClasses)
    })
  }

  convertUTCDateToLocalDate = date => {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  getSpinClasses = (spinClasses) => {
      for (let i = 0; i < spinClasses.length; i++) {
        let start = moment.utc(spinClasses[i].start).toDate();
        var localDate = new Date(start);
        debugger
        let end = moment.utc(spinClasses[i].end).toDate();
        this.setState({
          spinClasses: [...this.state.spinClasses, {
          title: spinClasses[i].time,
          start: start,
          end: end,
          allDay: false
        }]
        }, () => console.log(this.state.spinClasses))
      }
  }

  render() {
    return (
      <div>
        <BigCalendar
          localizer={localizer}
          defaultView='week'
          events={this.state.spinClasses}
          startAccessor="start"
          endAccessor="end"
          drilldownView="agenda"
        />
      </div>
    )
  }
}
export default Calendar
