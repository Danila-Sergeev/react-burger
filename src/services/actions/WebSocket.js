export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_GET_DATA = "WS_GET_DATA";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_SEND_DATA = "WS_SEND_DATA";
export const CLEAR_WS_DATA = "CLEAR_WS_DATA";

export const startWsConnection = (url) => ({
  type: WS_CONNECTION_START,
  payload: url,
});

export const wsConnectionSuccess = () => ({ type: WS_CONNECTION_SUCCESS });

export const wsConnectionError = () => ({ type: WS_CONNECTION_ERROR });

export const wsConnectionClosed = () => ({ type: WS_CONNECTION_CLOSED });

export const wsGetMessage = (message) => ({
  type: WS_GET_DATA,
  payload: message,
});
