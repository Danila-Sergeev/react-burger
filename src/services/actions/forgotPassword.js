import { BURGER_API_URL, request } from "../../utils/constants";
import { checkResponse } from "../api";
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export function getPassword(email) {
  return async (dispatch) => {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    try {
      const res = await request(`/password-reset`, fetch, {
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
      });
      const data = await checkResponse(res);
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAILED,
        error,
      });
    }
  };
}
