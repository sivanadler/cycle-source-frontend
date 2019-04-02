const initialState = {
  loginClicked: false,
  newUser: false,
}

const reducer = (state=initialState, action) => {

  switch (action.type) {
    case "SHOW_LOGIN_FORM":
      return {...state, loginClicked: true, newUser: false}
    case "NEW_USER":
      return {...state, loginClicked: false, newUser: true}
    default:
      return state
  }
}

export default reducer
