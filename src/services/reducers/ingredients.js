import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  RESET_INGREDIENTS,
} from "../actions/Ingredients.js";
const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  constructorIngredients: [],
  order: {},
};

export const ingredientsReducer = (state = initialState, action) => {
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
        ingredients: action.ingredients,
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
