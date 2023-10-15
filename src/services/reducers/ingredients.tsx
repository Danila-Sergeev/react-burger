import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  RESET_INGREDIENTS,
  IIngredientsActions,
} from "../actions/Ingredients.js";
import { IIngredient } from "../constants/constants.js";

type TIngredientsState = {
  ingredients: Array<IIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  constructorIngredients: Array<IIngredient>;
  order: object;
};

const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  constructorIngredients: [],
  order: {},
};

export const ingredientsReducer = (
  state = initialState,
  action: IIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients.data,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case RESET_INGREDIENTS: {
      return {
        ingredients: [],
        ingredientsRequest: false,
        ingredientsFailed: false,
        constructorIngredients: [],
        order: {},
      };
    }
    default: {
      return state;
    }
  }
};
