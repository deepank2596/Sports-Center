import { ERROR } from "../actions/actionTypes";
import { errorMessage } from "../actions/messageActions";

const initialState = {
  status: null,
  msg: {},
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return {
        status: action.payload.status,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};

export default errorReducer;
