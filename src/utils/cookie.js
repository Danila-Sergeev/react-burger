import { useDispatch, useSelector } from "react-redux";
export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  const cookieValue = matches ? decodeURIComponent(matches[1]) : undefined;

  return cookieValue;
}

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

function setRefreshToken() {
  let tok = getCookie("reftoken");
  return fetch("https://norma.nomoreparties.space/api/auth/token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer 3fab0d13ace4352aa1c12ef719648a33bc042215d568815f8b68631b0189015226d2ddd8ddf95962",
    },
    body: JSON.stringify({
      token:
        "3fab0d13ace4352aa1c12ef719648a33bc042215d568815f8b68631b0189015226d2ddd8ddf95962",
    }),
  }).then((res) =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
  );
}

export const getNewToken = () => {
  console.log(getCookie("reftoken"));
  return setRefreshToken();
};
/* let timerId = setInterval(() => getNewToken(), 20 * 60); */
