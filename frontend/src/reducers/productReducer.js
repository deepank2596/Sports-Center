import { GET_PRODUCTS } from "../actions/actionTypes";

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        products: [...action.payload],
      };
    default:
      return state;
  }
};

export default productReducer;
