import { GET_MESSAGE, CREATE_MESSAGE } from "../actions/actionTypes";

const messageReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MESSAGE:
      return action.payload;
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
};

export default messageReducer;
