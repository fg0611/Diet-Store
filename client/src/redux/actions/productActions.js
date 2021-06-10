import { sweetAlert } from "../../helpers/utils";
import Swal from "sweetalert2";

export const getProducts = () => {
  return function (dispatch) {
    return fetch("http://localhost:3001/product")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "GET_PRODUCTS", payload: data });
      });
  };
};

export const getProductReviews = (uuid) => {
  return async (dispatch) => {
    const res = await fetch(`http://localhost:3001/product/reviews/${uuid}`, {
      mode: "cors",
    });
    const resJson = await res.json();
    dispatch({
      type: "GET_PRODUCT_REVIEWS",
      payload: resJson,
    });
  };
};

export const addReview = (data) => {
  const { email, productUuid, text, rating } = data;
  console.log("Data Action::", data);
  // Receives::::  const { productUuid, email, text } = req.body;
  //http://localhost:3001/product/addReview/
  /*   {
    "email": "fran@gmail.com",
    "productUuid": "1c079541-444e-4bab-a506-a141338802b1",
            "text": "un engaño no lo compren"
    } */
  return async (dispatch) => {
    const res = await fetch(`http://localhost:3001/product/addReview/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        productUuid,
        text,
        rating,
      }),
      mode: "cors",
    });
    const resJson = await res.json();
    dispatch({
      type: "ADD_REVIEW",
      payload: resJson,
    });
    Swal.fire(resJson.message);
  };
};

export const createProduct = (datos) => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:3001/product/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    const resJson = await res.json();
    dispatch({
      type: "POST_PRODUCT",
      payload: resJson,
    });
  };
};

export const findProduct = (uuid) => {
  console.log(uuid);
  try {
    return async (dispatch) => {
      const res = await fetch(`http://localhost:3001/product/detail/${uuid}`);
      const resJson = await res.json();
      dispatch({
        type: "GET_PRODUCT",
        payload: resJson,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const filterByCategory = (categoryUuid) => async (dispatch) => {
  try {
    const res = await fetch(
      `http://localhost:3001/product/filterByCategory?uuid=${categoryUuid}`
    );
    const resJson = await res.json();
    console.log(resJson);
    dispatch({
      type: "GET_PRODUCTS",
      payload: resJson,
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchProducts = (name) => {
  return async (dispatch) => {
    const res = await fetch(
      `http://localhost:3001/product/search?name=${name}`
    );
    const resJson = await res.json();
    dispatch({
      type: "SEARCH_PRODUCTS",
      payload: resJson,
    });
  };
};

export const setSearchedProducts = (name) => {
  return async (dispatch) => {
    const res = await fetch(
      `http://localhost:3001/product/search?name=${name}`
    );
    const resJson = await res.json();
    dispatch({
      type: "GET_PRODUCTS", 
      payload: resJson,
    });
  };
};
