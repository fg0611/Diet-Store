import {
  GET_QUERY,
  RESET_QUERY,
  GET_OPTIONS,
  RESET_OPTIONS,
} from "./searchActions";

const initialState = {
  input: "",
  query: [],
  queryStatus: false,
  options: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUERY: {
      return {
        ...state,
        input: action.payload.input,
        queryStatus: true,
        query: action.payload.info,
      };
    }
    case GET_OPTIONS: {
      return {
        ...state,
        options: action.payload,
      };
    }
    case RESET_QUERY: {
      return {
        ...state,
        input: "",
        queryStatus: false,
      };
    }
    case RESET_OPTIONS: {
      return {
        ...state,
        options: [],
      };
    }
    default:
      return state;
  }
};
