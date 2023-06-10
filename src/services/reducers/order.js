import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  RESET_ORDER,
} from "../actions/Ingredients.js";
const initialState = {
  orderNumber: 0,
  status: "",
  orderFailed: false,
  orderRequest: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderNumber: action.orderNumber,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case RESET_ORDER: {
      return {
        orderNumber: 0,
        status: "",
        orderFailed: false,
        orderRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
