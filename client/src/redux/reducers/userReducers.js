const initialState = {
  user: {},
  loggedIn: false,
  fetching: false,
};

export default function userReducers(state = initialState, action) {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "USER_LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        fetching: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        fetching: false,
        ...action.payload,
        loggedIn: true,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case "LOG_OUT":
      return {
        loggedIn: false,
        fetching: false,
        //quedaria todo en false
      };
    default:
      return state;
  }
}
