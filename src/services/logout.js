import { getCookie } from "../utils/cookie";
export function logout() {
  return fetch("https://norma.nomoreparties.space/api/auth/login", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      token: getCookie("reftoken"),
    }),
  }).then((res) =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
  );
}
