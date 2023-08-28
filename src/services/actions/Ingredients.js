import { getCookie } from "../../utils/cookie";
import { checkResponse, fetchWithRefresh } from "../api";
import { BURGER_API_URL, request } from "../../utils/constants";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const RESET_INGREDIENTS = "RESET_INGREDIENTS";
export const SET_INGREDIENT_DETAILS = "SET_INGREDIENT_DETAILS";
export const DELETE_INGREDIENT_DETAILS = "DELETE_INGREDIENT_DETAILS";
export const SET_ORDER_NUMBER = "SET_ORDER_NUMBER";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const RESET_ORDER = "RESET_ORDER";

export function getIngredients() {
  return async (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    try {
      const data = await request(`/ingredients`, fetchWithRefresh);
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: data,
      });
    } catch (error) {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });
      dispatch({
        type: RESET_INGREDIENTS,
      });
    }
  };
}
export function getOrder(itemsId) {
  return async (dispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    try {
      const res = await request(`/orders`, fetch, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: itemsId,
        }),
      });
      const data = await checkResponse(res);
      dispatch({
        type: GET_ORDER_SUCCESS,
        orderNumber: data.order.number,
      });
    } catch (error) {
      dispatch({
        type: GET_ORDER_FAILED,
      });
      dispatch({
        type: RESET_ORDER,
      });
    }
  };
}
