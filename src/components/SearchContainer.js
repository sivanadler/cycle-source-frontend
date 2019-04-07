import React, { Fragment } from "react"
import HamburgerNav from './HamburgerNav'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { connect } from 'react-redux'

import MyMap from './MyMap'
import SearchBox from './SearchBox'
import Header from './Header'


const SearchContainer = (props) => {
  return (
  <div>
    <span>
      <HamburgerNav />
    </span>
    <span>
      <Header />
    </span>
    <h1 className="search-header">CYCLE SOURCE</h1>
    <SearchBox />
    <MyMap />
  </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(SearchContainer)
