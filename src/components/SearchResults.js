import React from "react"
import like from '../images/like.png'
import { connect } from 'react-redux'


const SearchResults = (props) => {
  function getStudioName(){
    console.log(props);
    if (props.studios) {
      let studio = props.studios.find(studio => studio.id === props.location.studio_id)
      return studio.name
    }
  }

  return (
  <div className="">
    {props !== undefined
      ?
      <div className="search-result-card">
        <h2>{getStudioName()} {props.location.name}</h2>
        <p>Rating: **** </p>
        <p>{props.location.address}</p>
        <p>{props.location.phone_number}</p>
        <p>{props.location.email}</p>
      </div>
      :
      null
    }
  </div>
  )
}
const mapStateToProps = state => {
  return {
    studios: state.studios
  }
}

export default connect(mapStateToProps)(SearchResults)
