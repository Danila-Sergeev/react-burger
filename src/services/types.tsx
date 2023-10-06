import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { rootReducer } from "./reducers/rootReducer";
import { IIngredientsActions } from "./actions/Ingredients";
export type RootState = ReturnType<typeof rootReducer>;
type TApplicationActions =
  | IIngredientsActions
  | TConstructorActions
  | TOrderActions
  | TAuthActions
  | TWSActions;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
