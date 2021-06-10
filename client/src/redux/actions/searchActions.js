import axios from "axios";
export const GET_QUERY = "GET_QUERY";
export const RESET_QUERY = "RESET_QUERY";
export const GET_OPTIONS = "GET_OPTIONS";
export const RESET_OPTIONS = "RESET_OPTIONS";

export function query(input) {
  return async function (dispatch) {
    const info = await axios.get(
      "http://localhost:3001/product/search?name=" + input
    );
    let found = {
      info: info.data,
      input,
    };
    dispatch({
      type: GET_QUERY,
      payload: found,
    });
  };
}

export function options(option) {
  return async function (dispatch) {
    const info = await axios.get(
      "http://localhost:3001/product/search?name=" + option
    );
    dispatch({
      type: GET_OPTIONS,
      payload: info.data,
    });
  };
}

export function resetQuery() {
  return function (dispatch) {
    dispatch({
      type: RESET_QUERY,
    });
  };
}

export function resetOptions() {
  return function (dispatch) {
    dispatch({
      type: RESET_OPTIONS,
    });
  };
}
