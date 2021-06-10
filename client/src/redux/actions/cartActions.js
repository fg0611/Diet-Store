import axios from "axios";
import { sweetAlert } from "../../helpers/utils";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CART_RESET = "CART_RESET";
export const CHANGE_PRODUCT_QTY = "CHANGE_PRODUCT_QTY";

export const addToCart = (uuid, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `http://localhost:3001/product/detail/${uuid}`
  );

  dispatch({
    type: ADD_TO_CART,
    payload: {
      uuid: data.uuid,
      name: data.name,
      image: data.image,
      price: data.price,
      stock: data.stock,
      qty,
    },
  });
  sweetAlert("Agregado", "success", "OK");
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (uuid) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: uuid,
  });
  sweetAlert("Eliminado", "success", "OK", 1000);
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const cartReset = () => (dispatch, getState) => {
  dispatch({
    type: CART_RESET,
    payload: [],
  });
  sweetAlert("Vaciado", "success", "OK", 1000);
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const changeProductQuantity = (productId, qty) => (
  dispatch,
  getState
) => {
  dispatch({
    type: CHANGE_PRODUCT_QTY,
    payload: { productId: productId, qty: qty },
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
