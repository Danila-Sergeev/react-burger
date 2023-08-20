import {
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
} from "../actions/user";
const initialState = {
  name: "",
  email: "",
  userRequest: false,
  userFailed: false,
};

export const userReducer = (state = initialState, action) => {
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
    default: {
      return state;
    }
  }
};
