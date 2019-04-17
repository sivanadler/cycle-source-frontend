import React from "react";
import { connect } from 'react-redux'

class Filter extends React.Component {
  state = {
    selectedVal: null,
    isChecked: null
  }

  handleChange = e => {
    let studio = this.props.studios.find(studio => studio.name === e.target.value)
    this.setState({
      isChecked: e.target
    })
    this.props.setFilterByStudio(studio)
  }

  renderStudioRadioBtns = () => {
    return this.props.studios.map(studio => {
      return (
        <div>
          <p className="inputs-ptag"><input type="radio" name="test" value={studio.name} onChange={this.handleChange} class="option-input checkbox"/>  {studio.name.toUpperCase()}</p>
        </div>
      )
    })
  }

  handlClearFilter = e => {
    let input = this.state.isChecked
    input.checked = false
    this.setState({
      isChecked: null
    })
    this.props.clearFilterByStudio()
  }

  clearFilter = () => {
    return (
      <div className="clear-filter" onClick={this.handlClearFilter}>CLEAR FILTER</div>
    )
  }

  render() {
    return (
      <div className="filter">
        <h1 className="filter-header">FILTER</h1>
        {
          this.props.studios
          ?
          <div className="studio-filter">
          <h1 className="studios-header">STUDIOS: </h1>
          {this.renderStudioRadioBtns()}
          </div>
          :
          null
        }

        {this.props.filterByStudio ? this.clearFilter() : null}
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

const mapDispatchtoProps = dispatch => {
  return {
    setFilterByStudio: (studio) => dispatch({ type: "SET_FILTER_BY_STUDIO", payload: studio}),
    clearFilterByStudio: () => dispatch({ type: "CLEAR_FILTER_BY_STUDIO"})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Filter)
