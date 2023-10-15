import { BURGER_API_URL, request } from "../../utils/constants";
import { checkResponse } from "../api";
export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" =
  "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" =
  "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" =
  "RESET_PASSWORD_FAILED";

interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
interface IResetPasswordSucces {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly data: any;
}
interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export type TResetPasswordActions =
  | IResetPasswordRequest
  | IResetPasswordSucces
  | IResetPasswordFailed;

export function getResetPassword(password: string, token: string) {
  return async (dispatch) => {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    try {
      const res = await request(`/password-reset/reset`, fetch, {
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
      });
      const data = await checkResponse(res);
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAILED,
        error,
      });
    }
  };
}
