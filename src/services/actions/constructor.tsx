import { v4 } from "uuid";
import { IIngredient } from "../constants/constants";

export const ADD_ITEM: "ADD_ITEM" = "ADD_ITEM";
export const RESET_ITEM: "RESET_ITEM" = "RESET_ITEM";
export const REMOVE_ITEM: "REMOVE_ITEM" = "REMOVE_ITEM";
export const MOVE_ITEM: "MOVE_ITEM" = "MOVE_ITEM";

interface IAddIngridientAction {
  readonly type: typeof ADD_ITEM;
  readonly item: any;
}
interface IDeleteIngredientAction {
  readonly type: typeof REMOVE_ITEM;
  readonly index?: number;
  readonly ingridien?: IIngredient;
  readonly id4: string;
}
interface IMoveIngredientAction {
  readonly type: typeof MOVE_ITEM;
  readonly dragIndex: number;
  readonly hoverIndex: number;
  readonly dragIngredient: any;
}
interface IResetIngredientAction {
  readonly type: typeof RESET_ITEM;
}

export const addIngridientAction = (
  ingridient: IIngredient
): IAddIngridientAction => {
  const key = v4();

  return {
    type: ADD_ITEM,
    item: {
      ...ingridient,
      key,
    },
  };
};

/* export const deleteIngredientAction = (
  id4: string
): IDeleteIngredientAction => {
  return {
    type: REMOVE_ITEM,
    id4,
  };
}; */

export type TConstructorActions =
  | IAddIngridientAction
  | IDeleteIngredientAction
  | IMoveIngredientAction
  | IResetIngredientAction;
