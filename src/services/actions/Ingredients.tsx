import { getCookie } from "../../utils/cookie";
import { checkResponse, fetchWithRefresh } from "../api";
import { BURGER_API_URL, request } from "../../utils/constants";
import { AppDispatch } from "../types";
import { IIngredient } from "../constants/constants";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";
export const RESET_INGREDIENTS: "RESET_INGREDIENTS" = "RESET_INGREDIENTS";
export const SET_INGREDIENT_DETAILS: "SET_INGREDIENT_DETAILS" =
  "SET_INGREDIENT_DETAILS";
export const DELETE_INGREDIENT_DETAILS: "DELETE_INGREDIENT_DETAILS" =
  "DELETE_INGREDIENT_DETAILS";
export const SET_ORDER_NUMBER: "SET_ORDER_NUMBER" = "SET_ORDER_NUMBER";
export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const RESET_ORDER: "RESET_ORDER" = "RESET_ORDER";

export interface IIngredientType {
  type: IIngredient;
}

interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
interface IgetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: IIngredient[];
}
interface IgetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
interface IResetIngredients {
  readonly type: typeof RESET_INGREDIENTS;
}
interface IsetIngredientsDetails {
  readonly type: typeof SET_INGREDIENT_DETAILS;
  readonly item: IIngredient;
}
interface IDeleteIngredientsDetails {
  readonly type: typeof DELETE_INGREDIENT_DETAILS;
}

export function getIngredients() {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    try {
      const data = await request(`/ingredients`, fetchWithRefresh);
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: data.data,
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

interface IPostOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
interface IPostOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly orderNumber: number;
}
interface IPostOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}
interface IPostOrderReset {
  readonly type: typeof RESET_ORDER;
}
export function getOrder(itemsId: Array<string | undefined>) {
  const accessTokenWithBearer: string | undefined = getCookie("token");
  const accessToken = accessTokenWithBearer
    ? accessTokenWithBearer.replace("Bearer ", "")
    : "";
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    try {
      const res = await request(`/orders`, fetch, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
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

export type IIngredientsActions =
  | IGetIngredientsRequest
  | IgetIngredientsSuccess
  | IgetIngredientsFailed
  | IPostOrderRequest
  | IPostOrderSuccess
  | IPostOrderFailed
  | IPostOrderReset
  | IsetIngredientsDetails
  | IDeleteIngredientsDetails
  | IResetIngredients;
