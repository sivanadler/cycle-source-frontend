import React from "react"
import { connect } from 'react-redux'

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
    this.props.saveSearchTerm(searchTerm)
    this.props.clearSearchInput()
  }

  renderResults = (searchTerm) => {
    if (this.props.locations.length !== 0) {
      let filteredStudioIds = []
      let filteredLocations = []

      this.props.studios.filter(studio =>{
        if (studio.name.toLowerCase().includes(searchTerm)) {
          filteredStudioIds.push(studio.id)
        }
      })
      this.props.locations.filter(location => {
        if (filteredStudioIds.includes(location.studio_id)) {
          filteredLocations.push(location)
          }
        })
      this.props.renderFilteredResults(filteredLocations)
    }

  }

  render() {
    return (
      <div >
        <br/>
        <form onSubmit={this.handleSubmit} className="search-bar-form">
            <input className="search-bar" type="text" name="searchInput" placeholder="Search by Studio Name" value={this.props.searchInput} onChange={this.handleSearchChange}/>
            <input type="submit" value="Apply" className="login-btn"/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchInput: state.searchInput,
    locations: state.locations,
    studios: state.studios,
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    updateSearchInput: (value) => dispatch({ type: "UPDATE_SEARCH_INPUT", payload: value}),
    renderFilteredResults: (array) => dispatch({ type: "RENDER_FILTERED_RESULTS", payload: array}),
    saveSearchTerm: (searchTerm) => dispatch({ type: "SAVE_SEARCH_TERM", payload: searchTerm}),
    clearSearchInput: () => dispatch({ type: "UPDATE_SEARCH_INPUT", payload: ""})
  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(SearchBar)
