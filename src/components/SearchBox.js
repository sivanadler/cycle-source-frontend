import React from "react"
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"
import Sort from "./Sort"
import StudioAdapter from '../apis/StudioAdapter'
import LocationAdapter from '../apis/LocationAdapter'

import { connect } from 'react-redux'
import wheelGif from '../images/wheel-gif.gif'

class SearchBox extends React.Component {

  handleClearFilter = () => {
    this.props.clearFilterLocations()
  }

  renderSearchResults = () => {
    if (this.props.locations.length !== 0) {
      return this.props.locations.map(location => {
        return <SearchResults key={location.id} location={location} history={this.props.history}/>
      })
    } else {
      return <img src={wheelGif} alt="loading" />
    }
  }

  renderFilteredResults = () => {
    debugger
    if (this.props.filteredLocations.length !== 0) {
      return this.props.filteredLocations.map(location => {
        return <SearchResults key={location.id} location={location} history={this.props.history}/>
      })
    } else {
      return <img src={wheelGif} alt="loading" />
    }
  }

  componentDidMount(){
    StudioAdapter.getStudios()
    .then(studios => {this.props.storeStudios(studios)})
    LocationAdapter.getLocations()
    .then(locations => {this.props.storeLocations(locations)})
  }

  render() {
    return (
      <div className="search-box">
        <div className="search-bar-div">
          <SearchBar />
          <Sort />
          {
            this.props.searchTerm
            ?
            <span>
              <h2 id="search-result-for"> Search Results For {this.props.searchTerm}: </h2>
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

  }
}


export default connect(mapStateToProps, mapDispatchtoProps)(SearchBox)
