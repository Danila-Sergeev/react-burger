import { getCookie, deleteCookie } from "../../utils/cookie";
import { fetchWithRefresh, checkResponse } from "../api";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const ISAUTH_CHECKED = "ISAUTH_CHECKED";
export const ISAUTH_CHECKED_FAILD = "ISAUTH_CHECKED_FAILD";
export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailed = (err) => ({
  type: LOGOUT_FAILED,
  payload: err,
});
export const isAuthChecked = (isAuthenticated) => ({
  type: ISAUTH_CHECKED,
  payload: isAuthenticated,
});

export const isAuthFailed = (err) => ({
  type: ISAUTH_CHECKED_FAILD,
  payload: err,
});

async function fetchUser() {
  return fetchWithRefresh("https://norma.nomoreparties.space/api/auth/user", {
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

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    return fetchUser()
      .then((data) => {
        if (data.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            data,
          });
        } else {
          dispatch({
            type: GET_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
}
function setUserInfo(name, email) {
  return fetch("https://norma.nomoreparties.space/api/auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  }).then((res) =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
  );
}

export function setUser(name, email) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    return setUserInfo(name, email)
      .then((data) => {
        console.log(data);
        dispatch({
          type: GET_USER_SUCCESS,
          data,
        });
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
}

export const logoutApi = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutRequest());

      const refreshToken = getCookie("reftoken");
      if (!refreshToken) {
        throw new Error("Refresh token not found");
      }

      const response = await fetch(
        "https://norma.nomoreparties.space/api/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: refreshToken,
          }),
        }
      );
      const data = await checkResponse(response);

      if (data.success) {
        dispatch(logoutSuccess());
        deleteCookie("reftoken");
        deleteCookie("token");
      } else {
        throw new Error("Failed to logout");
      }
    } catch (err) {
      dispatch(logoutFailed(err));
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
