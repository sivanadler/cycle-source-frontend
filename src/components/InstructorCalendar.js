import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import ModalWindow from './ModalWindow'
import { connect } from 'react-redux'
import SpinClassAdapter from '../apis/SpinClassAdapter'
import LocationAdapter from '../apis/LocationAdapter'
import StudioAdapter from '../apis/StudioAdapter'
import InstructorAdapter from '../apis/InstructorAdapter'
import Filter from './Filter'
import EventWrapper from "./EventWrapper";

const views=['week']
const localizer = BigCalendar.momentLocalizer(moment)

const minTime = new Date();
   minTime.setHours(5,30,0);
   const maxTime = new Date();
   maxTime.setHours(20,30,0);

 let formats = {
   dateFormat: 'dd',

   dayFormat: (date, localizer) =>
     localizer.format(date, 'DDD'),
 }

class InstructorCalendar extends React.Component {
  state = {
    spinClasses: [],
    showModal: false,
    event: null,
    minTime: minTime,
    maxTime: maxTime,
    address: null,
    filteredSpinClasses: []
  }

  static defaultProps = {
    elementProps: {},

    popup: false,
    toolbar: false,
    view: [views.WEEK],
    step: 60,
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

  convertUTCDateToLocalDate = date => {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    return newDate;
  }

  getAddress = spinClass => {
    if (this.props.locations.length !== 0) {
      debugger
    }
  }

  getSpinClasses = (spinClasses) => {
    for (let i = 0; i < spinClasses.length; i++) {
      let start = moment.utc(spinClasses[i].start).toDate();
      var startEST = this.convertUTCDateToLocalDate(new Date(start));
      let end = moment.utc(spinClasses[i].end).toDate();
      var endEST = this.convertUTCDateToLocalDate(new Date(end));
      this.setState({
        spinClasses: [...this.state.spinClasses, {
        title: spinClasses[i].time,
        start: startEST,
        end: endEST,
        allDay: false,
        location_id: spinClasses[i].location_id,
        studio_id: spinClasses[i].studio_id,
        instructor_id: spinClasses[i].instructor_id,
        class_id: spinClasses[i].id
      }]
    })
    }
  }

  events = () => {
    let spinClasses = this.state.spinClasses.filter(spinClass => spinClass.instructor_id === this.props.instructor.id)
    return spinClasses
  }

  eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = 'pink';
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'black',
        fontWeight: 'bold',
        border: '0px',
        display: 'block',
        fontFamily: "sans-serif",
        textAlign: "center",
    };
    return {
        style: style
    };
  }
  closeModal = () => {
    this.setState({
      showModal: false
    })
  }

  componentDidMount(){
    SpinClassAdapter.getSpinClasses()
    .then(spinClasses => {
      this.getSpinClasses(spinClasses)
    })
  }

  render() {
    return (
      <div style={{ height: 1000, display: 'block' }}>
      <div className="instructor-calendar-div">
        <h1>RIDE WITH ME:</h1>
        <BigCalendar
          step={30}
          views={['week']}
          className="instructor-calendar"
          localizer={localizer}
          defaultView='week'
          formats={this.formats}
          events={this.events()}
          startAccessor="start"
          endAccessor="end"
          min = {this.state.minTime}
          max = {this.state.maxTime}
          eventPropGetter={(this.eventStyleGetter)}
          onSelectEvent={(event) => {
            this.setState({ showModal: true, event })}}
        />
      </div>
        {this.state.showModal && <div className="modal"><ModalWindow events={this.state.event} closeModal={this.closeModal}/></div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations,
    studios: state.studios,
    filterByStudio: state.filterByStudio
  }
}

export default connect(mapStateToProps)(InstructorCalendar)
