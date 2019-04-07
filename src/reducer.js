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
  searchCleared: false
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
      return {...state, filteredLocations: action.payload}
    case "SAVE_SEARCH_TERM":
      return {...state, searchTerm: action.payload}
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
    default:
      return state
  }
}

export default reducer
