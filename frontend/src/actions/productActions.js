import Axios from "axios";
import { GET_PRODUCTS } from "./actionTypes";

export const getProducts = () => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  config.headers["Authorization"] = `Token ${getState().auth.token}`;

  Axios.get("http://localhost:8000/api/v1/apibackend/products", config)
    .then((res) => {
      dispatch({ type: GET_PRODUCTS, payload: res.data });
    })
    .catch((err) => console.log(config));
};
