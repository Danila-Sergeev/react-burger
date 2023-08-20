import { getCookie } from "../../utils/cookie";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

function fetchUser() {
  const url = "https://norma.nomoreparties.space/api/auth/user";
  return fetch(url, {
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
  }).then((response) => Promise.all([response, response.json()]));
}

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    return fetchUser()
      .then(([res, json]) => {
        let data = json;
        console.log(json);
        if (res.ok) {
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
      .catch((error) => {
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
