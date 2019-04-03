const initialState = {
  loginClicked: false,
  newUser: false,
  loggedIn: false,
  newUserType: null
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
    default:
      return state
  }
}

export default reducer
