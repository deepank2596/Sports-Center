import {
  GET_CART,
  REMOVE_FROM_CART,
  ADD_TO_CART,
} from "../actions/actionTypes";

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: [...action.payload],
      };
    case ADD_TO_CART:
    case REMOVE_FROM_CART:
      return state;
    default:
      return state;
  }
};

export default cartReducer;
