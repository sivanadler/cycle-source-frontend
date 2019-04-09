// import React from "react"
// import { connect } from 'react-redux'
//
// class Sort extends React.Component {
//   state = {
//     sortBy: null
//   }
//
//   handleOnChange = e => {
//     if (e.target.value === 'rating-descending') {
//
//       this.props.sortByTerm(e.target.value)
//     }
//     debugger
//   }
//
//   render() {
//     return (
//       <div className="sort">
//         <select onChange={this.handleOnChange}>
//           <option value="" selected disabled hidden>Choose To Sort</option>
//           <option value="rating-descending">Rating High To Low</option>
//           <option value="rating-ascending">Rating Low To High</option>
//         </select>
//       </div>
//     )
//   }
// }
//
// const mapStateToProps = state => {
//   return {
//     studios: state.studios,
//     reviews: state.reviews
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchtoProps)(Sort)
