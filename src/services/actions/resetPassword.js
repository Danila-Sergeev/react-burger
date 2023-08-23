export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

function resetPassword(password, token) {
  return fetch(" https://norma.nomoreparties.space/api/password-reset/reset", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  }).then((res) =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
  );
}

export function getResetPassword(password, token) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    return resetPassword(password, token)
      .then((data) => {
        console.log(data);
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: RESET_PASSWORD_FAILED,
          error,
        });
      });
  };
}
