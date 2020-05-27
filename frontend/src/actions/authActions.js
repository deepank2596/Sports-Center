import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOADING,
  USER_LOADED,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
} from "./actionTypes";
import { errorMessage, createMessage } from "./messageActions";
import { getCart, clearCart } from "./cartActions";
import { getProducts } from "./productActions";

const getConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `token ${token}`;
  }
  return config;
};

export const loadUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });
  axios
    .get("http://localhost:8000/api/auth/customer", getConfig(getState))
    .then((res) => {
      dispatch({ type: USER_LOADED, payload: res.data });
      dispatch(
        createMessage({ userLoaded: `Welcome ${res.data.user.username}` })
      );
    })
    .then((res) => dispatch(getCart()))
    .then((res) => dispatch(getProducts()))
    .catch((err) => {
      dispatch({ type: AUTH_ERROR });

      dispatch(errorMessage(err.response.status, err.response.data));
    });
};

// USER LOGIN
export const userLogin = (username, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, password });
  axios
    .post("http://localhost:8000/api/auth/login", body, config)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      dispatch(
        createMessage({
          userLoaded: `Welcome ${res.data.customer.user.username}`,
        })
      );
    })
    .then((res) => dispatch(getCart()))
    .then((res) => dispatch(getProducts()))
    .catch((err) => {
      //console.log(err);
      dispatch(errorMessage(err.response.status, err.response.data));
      dispatch({ type: LOGIN_FAILED });
    });
};

//Register USER

export const register = ({ username, password, email }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //Request Body
  const body = {
    mobile: "None",
    address: "None",
  };
  body["user"] = { username, password, email };
  console.log(body);
  axios
    .post("http://localhost:8000/api/auth/register", body, config)
    .then((res) => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      dispatch(
        createMessage({ registerSuccess: `${username} register successfull` })
      );
    })
    .then((res) => dispatch(getProducts()))
    .then((res) => dispatch(getCart()))
    .catch((err) => {
      console.log(err);
      dispatch(getMessage(err.response.status, err.response.data));
      dispatch({
        type: REGISTER_FAILED,
      });
    });
};

//Logout

export const logout = () => (dispatch, getState) => {
  axios
    .post("http://localhost:8000/api/auth/logout", {}, getConfig(getState))
    .then((res) => {
      dispatch({ type: LOGOUT_SUCCESS });
      dispatch(createMessage({ logoutSuccess: "Logout Successfully" }));
    })
    .then((res) => dispatch(clearCart()))
    .catch((err) => {
      dispatch({ type: AUTH_ERROR });
      dispatch(errorMessage(err.response.status, err.response.data));
    });
};
