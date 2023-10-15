import {
  GET_LOGIN_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  LOGOUT,
  TLoginActions,
} from "../actions/login.js";

type TloginState = {
  email: string;
  status: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  loginSuccess: boolean | undefined;
  token: string;
  refreshToken: string;
};

const initialState: TloginState = {
  email: "",
  status: false,
  loginRequest: false,
  loginFailed: false,
  loginSuccess: undefined,
  token: "",
  refreshToken: "",
};

export const loginReducer = (
  state = initialState,
  action: TLoginActions
): TloginState => {
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
        status: true,
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
        status: false,
        loginFailed: true,
        loginRequest: false,
        loginSuccess: action.error.success,
      };
    }
    case LOGOUT:
      return {
        ...state,
        status: false,
        token: "",
        refreshToken: "",
      };
    default: {
      return state;
    }
  }
};
