import {
  GET_LOGIN_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
} from "../actions/login.js";

const initialState = {
  email: "",
  password: "",
  loginRequest: false,
  loginFailed: false,
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
        email: action.email,
        password: action.password,
        loginFailed: false,
        loginRequest: false,
      };
    }
    case GET_LOGIN_FAILED: {
      return { ...state, loginFailed: true, loginRequest: false };
    }
    default: {
      return state;
    }
  }
};
