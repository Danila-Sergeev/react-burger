import {
  MOVE_ITEM,
  REMOVE_ITEM,
  RESET_ITEM,
  ADD_ITEM,
  TConstructorActions,
} from "../actions/constructor.js";
import { IIngredientType } from "../actions/Ingredients.js";
import { IIngredient } from "../constants/constants.js";

type TConstructorState = {
  bun: IIngredientType | null;
  items: Array<IIngredient>;
};

const initialState: TConstructorState = {
  items: [],
  bun: null,
};

export const constructorReducer = (
  state = initialState,
  action: TConstructorActions
): TConstructorState => {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        items:
          action.item.type !== "bun"
            ? [...state.items, action.item]
            : state.items,
        bun: action.item.type === "bun" ? action.item : state.bun,
      };
    }
    case RESET_ITEM: {
      return {
        ...state,
        bun: null,
        items: [],
      };
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter((item) => item.id4 !== action.id4),
      };
    }
    case MOVE_ITEM: {
      const dragIndex = action.dragIndex;
      const hoverIndex = action.hoverIndex;
      const dragIngredient = action.dragIngredient;
      const updatedItems = [...state.items];
      updatedItems.splice(dragIndex, 1);
      updatedItems.splice(hoverIndex, 0, dragIngredient);
      return {
        ...state,
        items: updatedItems,
      };
    }
    default: {
      return state;
    }
  }
};
