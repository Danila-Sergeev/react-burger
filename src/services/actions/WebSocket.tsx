import { IOrderDetails } from "../constants/constants";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_GET_DATA: "WS_GET_DATA" = "WS_GET_DATA";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_SEND_DATA: "WS_SEND_DATA" = "WS_SEND_DATA";
export const CLEAR_WS_DATA: "CLEAR_WS_DATA" = "CLEAR_WS_DATA";

export const startWsConnection = (url: string) => ({
  type: WS_CONNECTION_START,
  payload: url,
});

export interface IWebSocket {
  wsStart: string;
  onOpen: string;
  onError: string;
  onClose: string;
  onMessage: string;
  wsSend: string;
}

export interface IWsMessage {
  orders: Array<IOrderDetails>;
  success: boolean;
  total: number;
  totalToday: number;
}

interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}
interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}
interface IWsSendMessage {
  readonly type: typeof WS_SEND_DATA;
}
interface IWsGetMessage {
  readonly type: typeof WS_GET_DATA;
  readonly payload: IWsMessage;
}

export const wsConnectionSuccess = () => ({ type: WS_CONNECTION_SUCCESS });

export const wsConnectionError = () => ({ type: WS_CONNECTION_ERROR });

export const wsConnectionClosed = () => ({ type: WS_CONNECTION_CLOSED });

export const wsGetMessage = (message: string) => ({
  type: WS_GET_DATA,
  payload: message,
});
export type TWSActions =
  | IWsGetMessage
  | IWsSendMessage
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionClosed
  | IWsConnectionError;
