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
  token: "",
  refreshToken: [],
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
        token: action.data.accessToken.split("Bearer ")[1],
        refreshToken: action.data.refreshToken,
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
