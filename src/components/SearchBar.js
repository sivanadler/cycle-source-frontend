import React from "react"
import { connect } from 'react-redux'

const SearchBar = (props) => {

  function handleSearchChange(e){
    props.updateSearchInput(e.target.value)
  }

  return (
  <div>
    <h1 className="search-label">Find Your Ride </h1>
    <input className="search-bar" type="text" name="searchInput" placeholder="Search by Studio" value={props.searchInput} onChange={handleSearchChange}/>
  </div>
  )
}

const mapStateToProps = state => {
  return {
    searchInput: state.searchInput
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    updateSearchInput: (value) => dispatch({ type: "UPDATE_SEARCH_INPUT", payload: value})
  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(SearchBar)
