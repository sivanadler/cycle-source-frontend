import React from "react";
import { connect } from 'react-redux'
import LocationsDiv from './LocationsDiv'
import logo from '../images/flywheel.png'

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
      </div>
    )
  }
}
export default connect()(StudioShowContainer)
