export const GET_REGISTER_REQUEST = "GET_REGISTER_REQUEST";
export const GET_REGISTER_SUCCESS = "GET_REGISTER_SUCCESS";
export const GET_REGISTER_FAILED = "GET_REGISTER_FAILED";
function registred(email, password, name) {
  return fetch("https://norma.nomoreparties.space/api/auth/register", {
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
      name: name,
    }),
  }).then((res) =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
  );
}

export function getRegister(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: GET_REGISTER_REQUEST,
    });
    return registred(email, password, name)
      .then((data) => {
        console.log(data);
        dispatch({
          type: GET_REGISTER_SUCCESS,
          data,
        });
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: GET_REGISTER_FAILED,
          type: GET_REGISTER_SUCCESS,
        });
      });
  };
}
