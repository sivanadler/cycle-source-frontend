import React, { Fragment } from "react"
import HamburgerNav from './HamburgerNav'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { connect } from 'react-redux'
import StudioShowContainer from './StudioShowContainer'
import MyMap from './MyMap'
import SearchBox from './SearchBox'
import Header from './Header'


const SearchContainer = (props) => {
  return (
  <div className="search-container">
    <span>
      <HamburgerNav />
    </span>
    <span>
      <Header />
    </span>
    <h1 className="search-header">CYCLE SOURCE</h1>
    <br/><br/>
    {
      props.selectedStudio
      ?
      <StudioShowContainer studio={props.selectedStudio} currentUser={props.currentUser}/>
      :
      <Fragment >
        <SearchBox history={props.history}/>
        <MyMap />
      </Fragment >
    }
  </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    selectedStudio: state.selectedStudio
  }
}

export default connect(mapStateToProps)(SearchContainer)
