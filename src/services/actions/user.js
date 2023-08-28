import { getCookie, deleteCookie } from "../../utils/cookie";
import { fetchWithRefresh, checkResponse } from "../api";
import { BURGER_API_URL, request } from "../../utils/constants";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const ISAUTH_CHECKED = "ISAUTH_CHECKED";
export const ISAUTH_CHECKED_FAILD = "ISAUTH_CHECKED_FAILD";
export const isAuthChecked = (isAuthenticated) => ({
  type: ISAUTH_CHECKED,
  payload: isAuthenticated,
});
export const isAuthFailed = (err) => ({
  type: ISAUTH_CHECKED_FAILD,
  payload: err,
});

export function getUser() {
  return async (dispatch) => {
    dispatch({
      type: GET_USER_REQUEST,
    });
    try {
      const data = await request(`/auth/user`, fetchWithRefresh, {
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
      dispatch({
        type: GET_USER_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_FAILED,
      });
    }
  };
}

export function setUser(name, email) {
  return async (dispatch) => {
    dispatch({
      type: GET_USER_REQUEST,
    });
    try {
      const res = await request(`/auth/user`, fetch, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("token"),
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      });
      const data = await checkResponse(res);
      dispatch({
        type: GET_USER_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_FAILED,
      });
    }
  };
}

export const logoutApi = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGOUT_REQUEST });

      const refreshToken = getCookie("reftoken");
      if (!refreshToken) {
        throw new Error("Refresh token not found");
      }

      const res = await request(`/auth/logout`, fetch, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: refreshToken,
        }),
      });
      const data = await checkResponse(res);

      if (data.success) {
        dispatch({ type: LOGOUT_SUCCESS });
        deleteCookie("reftoken");
        deleteCookie("token");
      } else {
        throw new Error("Failed to logout");
      }
    } catch (err) {
      dispatch({ type: LOGOUT_FAILED, payload: err });
    }
  };
};

export const checkUserAuth = () => {
  return function (dispatch) {
    if (getCookie("token")) {
      dispatch(isAuthChecked(true));
    } else {
      dispatch(isAuthChecked(false));
    }
  };
};
