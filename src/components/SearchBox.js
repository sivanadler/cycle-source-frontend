import React from "react"
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"
// import Sort from "./Sort"
import StudioAdapter from '../apis/StudioAdapter'
import LocationAdapter from '../apis/LocationAdapter'

import { connect } from 'react-redux'
import wheelGif from '../images/wheel-gif.gif'

class SearchBox extends React.Component {

  state = {
    filteredLocations: []
  }

  handleClearFilter = () => {
    this.props.clearFilterLocations()
    this.findAllLocations()
    this.renderSearchResults()
  }

  getCorrectLocationsArray = () => {
    if (this.props.locations.length !== 0) {
      if (this.props.filteredLocations.length !== 0) {
        this.renderSearchResults(this.props.filteredLocations)
      } else {
        this.renderSearchResults(this.props.locations)
      }
    }
  }

  renderSearchResults = (locations) => {
    console.log(this.props.filteredLocations)
    if (this.props.locations.length !== 0) {
      return this.props.locations.map(location => {
        return <SearchResults key={location.id} location={location} history={this.props.history}/>
      })
    }
  }

  renderFilteredResults = () => {
    console.log(this.props.filteredLocations)
    debugger
      return this.props.filteredLocations.map(location => {
        debugger
        return <SearchResults key={location.id} location={location} history={this.props.history}/>
      })
  }

  findAllLocations = () => {
    LocationAdapter.getLocations()
    .then(locations => {this.props.storeLocations(locations)})
  }

  componentDidMount(){
    StudioAdapter.getStudios()
    .then(studios => {this.props.storeStudios(studios)})
    this.findAllLocations()
  }

  render() {
    return (
      <div className="search-box">
        <div className="search-bar-div">
          <SearchBar />
          {
            this.props.searchTerm
            ?
            <span>
              <h2 id="search-result-for"> Search Results For {this.props.searchTerm.toUpperCase()}: </h2>
              <h2 id="clear-filter" onClick={this.handleClearFilter}>Clear Filter</h2>
            </span>
            :
            null}
        </div>
        {this.props.filteredLocations.length !== 0 ? this.renderFilteredResults() : this.renderSearchResults()}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations,
    studios: state.studios,
    searchInput: state.searchInput,
    filteredLocations: state.filteredLocations,
    searchTerm: state.searchTerm,
    isFetching: state.isFetching
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    storeStudios: (array) => dispatch({ type: "GET_STUDIOS", payload: array }),
    clearFilterLocations: () => dispatch({ type: "CLEAR_SEARCH_FILTER"}),
    storeLocations: (array) => dispatch({ type: "GET_LOCATIONS", payload: array }),
    clearLocations: () => dispatch({ type: "CLEAR_LOCATIONS"})

  }
}


export default connect(mapStateToProps, mapDispatchtoProps)(SearchBox)
