import React from "react"
import { connect } from 'react-redux'
import LocationAdapter from '../apis/LocationAdapter'
import StudioAdapter from '../apis/StudioAdapter'


class SearchBar extends React.Component {
  state = {
    locations: [],
    studios: [],
    searchTerm: null
  }

  handleSearchChange = e => {
    this.props.updateSearchInput(e.target.value)
  }

  handleSubmit = e => {
    e.preventDefault()
    let searchTerm = e.target.searchInput.value.toLowerCase()
    this.renderResults(searchTerm)
  }

  renderResults = (searchTerm) => {
    if (this.state.locations.length !== 0) {
      let filteredStudioIds = []
      let filteredLocations = []

      this.state.studios.filter(studio =>{
        if (studio.name.toLowerCase().includes(searchTerm)) {
          filteredStudioIds.push(studio.id)
        }
      })
      this.state.locations.filter(location => {
        if (filteredStudioIds.includes(location.studio_id)) {
          filteredLocations.push(location)
          }
        })
      this.props.renderFilteredResults(filteredLocations)
    }

  }

  componentDidMount(){
    LocationAdapter.getLocations()
    .then(json => {
      this.setState({locations: json})
    })
    StudioAdapter.getStudios()
    .then(json => {
      this.setState({ studios: json})
    })
  }

  render() {
    return (
      <div>
        <h1 className="search-label">Find Your Ride </h1>
        <form onSubmit={this.handleSubmit}>
          <input className="search-bar" type="text" name="searchInput" placeholder="Search by Studio" value={this.props.searchInput} onChange={this.handleSearchChange}/>
          <input type="submit" value="Apply" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchInput: state.searchInput
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    updateSearchInput: (value) => dispatch({ type: "UPDATE_SEARCH_INPUT", payload: value}),
    renderFilteredResults: (array) => dispatch({ type: "RENDER_FILTERED_RESULTS", payload: array})
  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(SearchBar)
