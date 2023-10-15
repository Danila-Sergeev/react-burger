import { IIngredient } from "../constants/constants";

export const ADD_ITEM: "ADD_ITEM" = "ADD_ITEM";
export const RESET_ITEM: "RESET_ITEM" = "RESET_ITEM";
export const REMOVE_ITEM: "REMOVE_ITEM" = "REMOVE_ITEM";
export const MOVE_ITEM: "MOVE_ITEM" = "MOVE_ITEM";

interface IAddIngridientAction {
  readonly type: typeof ADD_ITEM;
  readonly ingridient: IIngredient;
  readonly item: any;
}
interface IDeleteIngredientAction {
  readonly type: typeof REMOVE_ITEM;
  readonly index: number;
  readonly ingridient: IIngredient;
  readonly id4: string;
}
interface IMoveIngredientAction {
  readonly type: typeof MOVE_ITEM;
  readonly dragIndex: any;
  readonly hoverIndex: any;
  readonly dragIngredient: any;
}
interface IResetIngredientAction {
  readonly type: typeof RESET_ITEM;
}

export type TConstructorActions =
  | IAddIngridientAction
  | IDeleteIngredientAction
  | IMoveIngredientAction
  | IResetIngredientAction;
