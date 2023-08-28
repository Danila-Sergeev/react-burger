import { BURGER_API_URL, request } from "../../utils/constants";
import { checkResponse } from "../api";
export const GET_REGISTER_REQUEST = "GET_REGISTER_REQUEST";
export const GET_REGISTER_SUCCESS = "GET_REGISTER_SUCCESS";
export const GET_REGISTER_FAILED = "GET_REGISTER_FAILED";

export function getRegister(email, password, name) {
  return async (dispatch) => {
    dispatch({
      type: GET_REGISTER_REQUEST,
    });
    try {
      const res = await request(`/auth/register`, fetch, {
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
      });
      const data = await checkResponse(res);
      dispatch({
        type: GET_REGISTER_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: GET_REGISTER_FAILED,
        error,
      });
    }
  };
}
