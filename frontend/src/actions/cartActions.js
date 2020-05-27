import { GET_CART, ADD_TO_CART, REMOVE_FROM_CART } from "./actionTypes";
import Axios from "axios";
import { errorMessage, createMessage } from "./messageActions";

const getConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  config.headers["Authorization"] = `token ${token}`;
  return config;
};

export const clearCart = () => {
  return {
    type: GET_CART,
    payload: [],
  };
};

export const getCart = () => (dispatch, getState) => {
  Axios.get(
    "http://localhost:8000/api/v1/apibackend/cart/",
    getConfig(getState)
  )
    .then((res) => {
      dispatch({ type: GET_CART, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch(errorMessage(err.response.status, err.response.data));
    });
};

export const addToCart = (id) => (dispatch, getState) => {
  const body = {
    product: {
      id: id,
    },
  };
  Axios.post(
    "http://localhost:8000/api/v1/apibackend/cart/",
    body,
    getConfig(getState)
  )
    .then((res) => {
      dispatch({ type: ADD_TO_CART });
      dispatch(
        createMessage({
          productAdded: `${res.data.product.name} Added To Cart`,
        })
      );
      dispatch(getCart());
    })
    .catch((err) => {
      console.log(err);
      dispatch(errorMessage(err.response.status, err.response.data));
    });
};

export const removeFromCart = (id) => (dispatch, getState) => {
  Axios.delete(
    `http://localhost:8000/api/v1/apibackend/cart/${id}/`,
    getConfig(getState)
  )
    .then((res) => {
      dispatch({ type: REMOVE_FROM_CART });
      dispatch(getCart());
    })
    .then((res) =>
      dispatch(createMessage({ itemRemoved: "Item Removed from Cart" }))
    )
    .catch((err) => {
      console.log(err);
      dispatch(errorMessage(err.response.status, err.response.data));
    });
};
