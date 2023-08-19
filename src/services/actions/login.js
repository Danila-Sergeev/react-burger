export const GET_LOGIN_REQUEST = "GET_LOGIN_REQUEST";
export const GET_LOGIN_SUCCESS = "GET_LOGIN_SUCCESS";
export const GET_LOGIN_FAILED = "GET_LOGIN_FAILED";
function login(email, password) {
  return fetch("https://norma.nomoreparties.space/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "email",
      password: "password",
    }),
  }).then((res) =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
  );
}

export function getLogin(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: GET_LOGIN_REQUEST,
    });
    return login(email, password)
      .then((data) => {
        dispatch({
          type: GET_LOGIN_SUCCESS,
        });
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: GET_LOGIN_FAILED,
        });
      });
  };
}
