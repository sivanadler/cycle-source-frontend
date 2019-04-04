import React from "react"
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"
import Sort from "./Sort"
import LocationAdapter from '../apis/LocationAdapter'
import StudioAdapter from '../apis/StudioAdapter'
import { connect } from 'react-redux'

class SearchBox extends React.Component {

  componentDidMount(){
    LocationAdapter.getLocations()
    .then(json => {
      this.props.storeLocations(json)
    })
    StudioAdapter.getStudios()
    .then(json => {
      this.props.storeStudios(json)
    })
  }

  render() {
    return (
      <div className="search-box">
        <SearchBar />
        <Sort />
        {this.props.locations.map(location => {
          return <SearchResults key={location.id} location={location}/>
        })}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations,
    studios: state.studios,
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    storeLocations: (array) => dispatch({ type: "GET_LOCATIONS", payload: array }),
    storeStudios: (array) => dispatch({ type: "GET_STUDIOS", payload: array }),

  }
}


export default connect(mapStateToProps, mapDispatchtoProps)(SearchBox)
