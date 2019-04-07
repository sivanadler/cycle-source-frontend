import React from "react";
import { connect } from 'react-redux'
import LocationsDiv from './LocationsDiv'
import ReviewsDiv from './ReviewsDiv'
import logo from '../images/flywheel.png'
import UserAdapter from '../apis/UserAdapter'

class StudioShowContainer extends React.Component {
  
  render() {
    return (
      <div>
        <div className="studio-show-header">
          <span>
          <img className="studio-logo" src={logo} alt="logo" />
          </span>
          <span>
          <h1 className="studio-head">{this.props.studio.name}</h1>
          </span>
        </div>
        <LocationsDiv studio_id={this.props.studio.id}/>
        <ReviewsDiv studio={this.props.studio}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    setUsers: (array) => dispatch({ type: "STORE_USERS", payload: array}),
  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(StudioShowContainer)
