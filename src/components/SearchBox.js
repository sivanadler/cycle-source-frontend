import React from "react"
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"

const SearchBox = () => {
  return (
  <div className="search-box">
    <SearchBar />
    <SearchResults />
  </div>
  )
}

export default SearchBox
