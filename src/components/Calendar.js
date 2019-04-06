import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Modal from './Modal'
import { connect } from 'react-redux'
import SpinClassAdapter from '../apis/SpinClassAdapter'
import LocationAdapter from '../apis/LocationAdapter'
import StudioAdapter from '../apis/StudioAdapter'
import InstructorAdapter from '../apis/InstructorAdapter'


const localizer = BigCalendar.momentLocalizer(moment)

const views=['week', 'day', 'month']

const minTime = new Date();
   minTime.setHours(5,30,0);
   const maxTime = new Date();
   maxTime.setHours(20,30,0);

 let formats = {
   dateFormat: 'dd',

   dayFormat: (date, localizer) =>
     localizer.format(date, 'DDD'),
 }

class Calendar extends React.Component {
  state = {
    spinClasses: [],
    showModal: false,
    event: null,
    minTime: minTime,
    maxTime: maxTime,
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

    LocationAdapter.getLocations()
    .then(locations => {
      this.props.storeLocations(locations)})

    StudioAdapter.getStudios()
    .then(studios => {this.props.storeStudios(studios)})

    InstructorAdapter.getInstructors()
    .then(instructors => {this.props.storeInstructors(instructors)})
  }

  convertUTCDateToLocalDate = date => {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    return newDate;
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

  render() {
    return (
      <div>
      <h1>BOOK YOUR RIDE</h1>
        <BigCalendar
          className="calendar"
          localizer={localizer}
          defaultView='week'
          formats={this.formats}
          events={this.state.spinClasses}
          startAccessor="start"
          endAccessor="end"
          min = {this.state.minTime}
          max = {this.state.maxTime}
          onSelectEvent={(event) => {
            this.setState({ showModal: true, event })}}
        />
        {this.state.showModal && <Modal events={this.state.event}/>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    storeLocations: (array) => dispatch({ type: "GET_LOCATIONS", payload: array }),
    storeStudios: (array) => dispatch({ type: "GET_STUDIOS", payload: array }),
    storeInstructors: (array) => dispatch({ type: "GET_INSTRUCTORS", payload: array }),
  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(Calendar)
