import { getCookie } from "../../utils/cookie";
import { fetchWithRefresh } from "../api";
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

function fetchIngredients() {
  const url = "https://norma.nomoreparties.space/api/ingredients";
  return fetchWithRefresh(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      // Отправляем токен и схему авторизации в заголовке при запросе данных
      Authorization: "Bearer " + getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
}

export function getIngredients() {
  return async (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    return fetchIngredients()
      .then((data) => {
        if (data.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
        dispatch({
          type: RESET_INGREDIENTS,
        });
      });
  };
}
function fetchOrder(itemsId) {
  return fetch("https://norma.nomoreparties.space/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: itemsId,
    }),
  }).then((res) =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
  );
}

export function getOrder(itemsId) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    return fetchOrder(itemsId)
      .then((data) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          orderNumber: data.order.number,
        });
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: GET_ORDER_FAILED,
        });
        dispatch({
          type: RESET_ORDER,
        });
      });
  };
}
