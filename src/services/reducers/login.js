import {
  GET_LOGIN_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
} from "../actions/login.js";

const initialState = {
  email: [],

  loginRequest: false,
  loginFailed: false,
  loginSuccess: undefined,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case GET_LOGIN_SUCCESS: {
      return {
        ...state,
        email: action.data.user.email,
        loginFailed: false,
        loginRequest: false,
        loginSuccess: action.data.success,
      };
    }
    case GET_LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
        loginSuccess: action.error.success,
      };
    }
    default: {
      return state;
    }
  }
};
