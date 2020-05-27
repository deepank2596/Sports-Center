import { ERROR, CREATE_MESSAGE, GET_MESSAGE } from "./actionTypes";

export const errorMessage = (status, msg) => {
  return {
    type: ERROR,
    payload: { status, msg },
  };
};

export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};

export const getMessage = (status, msg) => {
  return {
    type: GET_MESSAGE,
    payload: { status, msg },
  };
};
