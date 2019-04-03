const initialState = {
  loginClicked: false,
  newUser: false,
  loggedIn: true,
  newUserType: null,
  searchInput: "",
  myReservations: true,
  myFavorites: false,
}

const reducer = (state=initialState, action) => {

  switch (action.type) {
    case "SHOW_LOGIN_FORM":
      return {...state, loginClicked: true, newUser: false}
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
    default:
      return state
  }
}

export default reducer
