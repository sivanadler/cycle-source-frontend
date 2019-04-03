import React, { Fragment } from "react"
import HamburgerNav from './HamburgerNav'
import { Grid, Row, Col } from 'react-flexbox-grid'

import Map from './Map'
import SearchBox from './SearchBox'

const SearchContainer = () => {
  return (
  <div>
    <HamburgerNav />
    <h1 className="search-header">CYCLE SOURCE</h1>
    <SearchBox />
    <Map />
  </div>
  )
}

export default SearchContainer
