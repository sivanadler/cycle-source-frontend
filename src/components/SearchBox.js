import React from "react"
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"
import Sort from "./Sort"

const SearchBox = () => {
  return (
  <div className="search-box">
    <SearchBar />
    <Sort />
    <SearchResults />
  </div>
  )
}

export default SearchBox
