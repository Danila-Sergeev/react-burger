import {
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  LOGOUT_SUCCESS,
  ISAUTH_CHECKED,
  ISAUTH_CHECKED_FAILD,
  TUserActions,
} from "../actions/user";

type TUserState = {
  name: string;
  email: string;
  userRequest: boolean;
  userFailed: boolean;
  isAuthChecked: boolean;
  user: null;
  authError: null;
};

const initialState: TUserState = {
  name: "",
  email: "",
  userRequest: false,
  userFailed: false,
  isAuthChecked: false,
  user: null,
  authError: null,
};

export const userReducer = (
  state = initialState,
  action: TUserActions
): TUserState => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        name: action.data.user.name,
        email: action.data.user.email,
        userRequest: false,
      };
    }
    case GET_USER_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthChecked: false,
        user: null,
        authError: null,
      };
    case ISAUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
        authError: null,
      };
    case ISAUTH_CHECKED_FAILD:
      return {
        ...state,
        isAuthChecked: false,
      };
    default: {
      return state;
    }
  }
};
