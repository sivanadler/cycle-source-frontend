import React from "react"
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"
import Sort from "./Sort"
import StudioAdapter from '../apis/StudioAdapter'
import LocationAdapter from '../apis/LocationAdapter'

import { connect } from 'react-redux'

class SearchBox extends React.Component {

  handleClearFilter = () => {
    this.props.clearFilterLocations()
  }

  componentDidMount(){
    LocationAdapter.getLocations()
    .then(locations => {this.props.storeLocations(locations)})

    StudioAdapter.getStudios()
    .then(studios => {this.props.storeStudios(studios)})
  }

  render() {
    console.log("here", this.props.locations);
    return (
      <div className="search-box">
        <div className="search-bar-div">
          <SearchBar />
          <Sort />
          {console.log(this.props.searchTerm)}
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
        {
          this.props.filteredLocations.length !== 0
          ?
          this.props.filteredLocations.map(location => {
            return <SearchResults key={location.id} location={location}/>
          })
          :
          this.props.locations.map(location => {
            return <SearchResults key={location.id} location={location}/>
          })
        }

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
    searchTerm: state.searchTerm
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
