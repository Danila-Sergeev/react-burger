import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  TForgotPasswordActions,
} from "../actions/forgotPassword";

type TForgotPassword = {
  fargotPasswordRequest: boolean;
  success: boolean;
  message: string;
};
const initialState: TForgotPassword = {
  fargotPasswordRequest: false,
  success: false,
  message: "",
};

export const forgotPasswordReducer = (
  state = initialState,
  action: TForgotPasswordActions
): TForgotPassword => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        fargotPasswordRequest: true,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        success: action.data.success,
        message: action.data.message,
        fargotPasswordRequest: false,
      };
    }

    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        fargotPasswordRequest: false,
      };
    }

    default: {
      return state;
    }
  }
};
