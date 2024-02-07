import {
  GET_REGISTER_FAILED,
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS,
  TRegisterActions,
} from "../actions/register";

type TRegisterState = {
  email: string;
  password: string;

  name: string;
  errorMessage: string;
  registerRequest: boolean;
  registerFailed: boolean;
  registerSuccess: boolean | undefined;
  loginSuccess: boolean;
};

const initialState: TRegisterState = {
  email: "",
  password: "",

  name: "",
  errorMessage: "",
  registerRequest: false,
  registerFailed: false,
  registerSuccess: undefined,
  loginSuccess: false,
};

export const registerReducer = (
  state = initialState,
  action: TRegisterActions
): TRegisterState => {
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
        registerSuccess: action.data.success,
      };
    }
    case GET_REGISTER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
        errorMessage: action.error.message,
        loginSuccess: action.error.success,
      };
    }
    default: {
      return state;
    }
  }
};
