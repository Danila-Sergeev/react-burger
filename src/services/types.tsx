import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { rootReducer } from "./reducers/rootReducer";
import { ActionCreator } from "redux";
import { IIngredientsActions } from "./actions/Ingredients";
import { TConstructorActions } from "./actions/constructor";
import { TForgotPasswordActions } from "./actions/forgotPassword";
import { TLoginActions } from "./actions/login";
import { TRegisterActions } from "./actions/register";
import { TResetPasswordActions } from "./actions/resetPassword";
import { TUserActions } from "./actions/user";
import { TWSActions } from "./actions/WebSocket";
export type RootState = ReturnType<typeof rootReducer>;
type TApplicationActions =
  | IIngredientsActions
  | TConstructorActions
  | TForgotPasswordActions
  | TRegisterActions
  | TLoginActions
  | TResetPasswordActions
  | TUserActions
  | TWSActions;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, unknown, TApplicationActions>
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
