import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientReducer } from "./ingredient";
import { orderReducer } from "./order";
import { constructorReducer } from "./constructor";
import { registerReducer } from "./register";
import { loginReducer } from "./login";
import { userReducer } from "./user";
import { forgotPasswordReducer } from "./forgotPassword";
import { resetPasswordReducer } from "./resetPassword";
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
  constr: constructorReducer,
  order: orderReducer,
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
});
