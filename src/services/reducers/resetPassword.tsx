import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  TResetPasswordActions,
} from "../actions/resetPassword";

type TResetPasswordState = {
  resetPasswordRequest: boolean;
  success: boolean;
  message: string;
};

const initialState: TResetPasswordState = {
  resetPasswordRequest: false,
  success: false,
  message: "",
};

export const resetPasswordReducer = (
  state = initialState,
  action: TResetPasswordActions
): TResetPasswordState => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        success: action.data.success,
        message: action.data.message,
        resetPasswordRequest: false,
      };
    }

    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
      };
    }

    default: {
      return state;
    }
  }
};
