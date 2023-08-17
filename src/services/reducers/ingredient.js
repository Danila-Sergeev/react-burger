import {
  SET_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
} from "../actions/Ingredients.js";
const initialState = {
  currentIngredient: {},
};

export const ingredientReducer = (state = initialState, action) => {
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
        currentIngredient: {},
      };
    }
    default: {
      return state;
    }
  }
};
