export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

function forgotPassword(email) {
  return fetch("https://norma.nomoreparties.space/api/password-reset", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      email: email,
    }),
  }).then((res) =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
  );
}

export function getPassword(email) {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    return forgotPassword(email)
      .then((data) => {
        console.log(data);
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
          error,
        });
      });
  };
}
