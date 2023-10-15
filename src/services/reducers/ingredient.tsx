import {
  SET_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
  IIngredientsActions,
} from "../actions/Ingredients.js";
import { IIngredient } from "../constants/constants.js";

type TIngredientState = {
  currentIngredient: IIngredient | undefined;
};

const initialState: TIngredientState = {
  currentIngredient: undefined,
};

export const ingredientReducer = (
  state = initialState,
  action: IIngredientsActions
): TIngredientState => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS: {
      return {
        ...state,
        currentIngredient: action.item,
      };
    }
    case DELETE_INGREDIENT_DETAILS: {
      return {
        ...state,
        currentIngredient: undefined,
      };
    }
    default: {
      return state;
    }
  }
};
