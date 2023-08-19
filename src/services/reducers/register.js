import {
  GET_REGISTER_FAILED,
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS,
} from "../actions/register";

const initialState = {
  email: [],
  password: [],

  name: [],
  registerRequest: false,
  registerFailed: false,
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case GET_REGISTER_SUCCESS: {
      return {
        ...state,
        email: action.data.user.email,
        name: action.data.user.name,
        registerFailed: false,
        registerRequest: false,
      };
    }
    case GET_REGISTER_FAILED: {
      return { ...state, registerFailed: true, registerRequest: false };
    }
    default: {
      return state;
    }
  }
};