const initialState = {
  currentUser: null,
  users: [],
  loginClicked: false,
  newUser: false,
  loggedIn: false,
  newUserType: null,
  searchInput: "",
  myReservations: true,
  myFavorites: false,
  locations: [],
  studios: [],
  filteredLocations: [],
  searchTerm: null,
  coordinates: [],
  filteredCoordinates: [],
  instructors: [],
  bookThisClass: null,
  selectedBike: null,
  userClasses: [],
  spinClasses: [],
  searchCleared: false,
  isFetching: true,
  selectedStudio: null,
  reviews: [],
  reviewForm: false,
  filterByStudio: null,
  InstructorReviews: [],
  changeBike: null,
  setSelectedChangedBike: null,
  alreadyReservedBike: null
}

const reducer = (state=initialState, action) => {

  switch (action.type) {
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload}
    case "ADD_NEW_USER":
      return {...state, users: [...state.users, action.payload]}
    case "LOGOUT":
      return {...state, currentUser: null, loggedIn: false, loginClicked: false}
    case "SHOW_LOGIN_FORM":
      return {...state, loginClicked: true, newUser: false}
    case "STORE_USERS":
      return {...state, users: action.payload}
    case "GET_INSTRUCTORS":
      return {...state, instructors: action.payload}
    case "NEW_USER":
      return {...state, loginClicked: false, newUser: true}
    case "LOG_USER_IN":
      return {...state, loggedIn: true}
    case "SET_NEW_USER_TYPE":
      return {...state, newUserType: action.payload}
    case "UPDATE_SEARCH_INPUT":
      return {...state, searchInput: action.payload}
    case "RENDER_USERS_RESERVATIONS":
      return {...state, myReservations: true, myFavorites: false}
    case "RENDER_USERS_FAVORITES":
      return {...state, myReservations: false, myFavorites: true}
    case "GET_LOCATIONS":
      return {...state, locations: action.payload}
    case "GET_STUDIOS":
      return {...state, studios: action.payload}
    case "RENDER_FILTERED_RESULTS":
      return {...state, filteredLocations: action.payload, isFetching: false}
    case "SAVE_SEARCH_TERM":
      return {...state, searchTerm: action.payload, isFetching: false}
    case "CLEAR_SEARCH_FILTER":
      return {...state, filteredLocations: [], searchTerm: null, searchCleared: true}
    case "SET_COORDINATES":
      return {...state, coordinates: [...state.coordinates, action.payload], filteredCoordinates: []}
    case "SET_FILTERED_COORDINATES":
      return {...state, filteredCoordinates: [...state.filteredCoordinates, action.payload], coordinates: [], filteredLocations: []}
    case "OPEN_BOOK_CLASS_WINDOW":
      return {...state, bookThisClass: action.payload}
    case "SET_SELECTED_BIKE":
      return {...state, selectedBike: action.payload}
    case "GET_USER_CLASSES":
      return {...state, userClasses: action.payload}
    case "SAVE_SPIN_CLASSES":
      return {...state, spinClasses: action.payload}
    case "SET_SELECTED_STUDIO":
      return {...state, selectedStudio: action.payload}
    case "TOGGLE_REVIEW_FORM":
      return {...state, reviewForm: !state.reviewForm}
    case "SET_REVIEWS":
      return {...state, reviews: action.payload}
    case "SAVE_REVIEW":
      return {...state, reviews: [action.payload, ...state.reviews], reviewForm: false}
    case "SET_FILTER_BY_STUDIO":
      return {...state, filterByStudio: action.payload}
    case "CLEAR_FILTER_BY_STUDIO":
      return {...state, filterByStudio: null}
    case "SET_INSTRUCTOR_REVIEWS":
      return {...state, instructorReviews: action.payload}
    case "SAVE_INSTRUCTOR_REVIEW":
      return {...state, instructorReviews: [action.payload, ...state.instructorReviews], reviewForm: false}
    case "CHANGE_BIKE":
      return {...state, changeBike: action.payload}
    case "SET_SELECTED_CHANGED_BIKE":
      return {...state, setSelectedChangedBike: action.payload}
    case "UPDATE_USER_CLASSES":
      return {...state, userClasses: action.payload}
    case "ALREADY_RESERVED":
      return {...state, alreadyReservedBike: action.payload}
    default:
      return state
  }
}

export default reducer
