import { IWebSocket } from "../services/actions/WebSocket";
import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch } from "../services/types";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: IWebSocket
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let url = undefined;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, onOpen, onError, onClose, onMessage, wsSend } =
        wsActions;

      if (type === wsStart) {
        url = payload;
        socket = new WebSocket(url);
      }
      // else if (type === onClose) {
      //   socket.close(1000, 'CLOSE_NORMAL')
      // }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };
        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSend) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  };
};
