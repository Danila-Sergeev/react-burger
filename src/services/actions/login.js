import { BURGER_API_URL, request } from "../../utils/constants";
import { checkResponse } from "../api";
export const GET_LOGIN_REQUEST = "GET_LOGIN_REQUEST";
export const GET_LOGIN_SUCCESS = "GET_LOGIN_SUCCESS";
export const GET_LOGIN_FAILED = "GET_LOGIN_FAILED";
export const LOGOUT = "LOGOUT";
export const logoutStatus = () => ({
  type: LOGOUT,
});

export function getLogin(email, password) {
  return async (dispatch) => {
    dispatch({
      type: GET_LOGIN_REQUEST,
    });
    try {
      const res = await request(`/auth/login`, fetch, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await checkResponse(res);
      dispatch({
        type: GET_LOGIN_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: GET_LOGIN_FAILED,
        error,
      });
    }
  };
}
