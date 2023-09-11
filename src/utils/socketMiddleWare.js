import { refreshToken } from "../services/api";

let socketUserOrders = null;
let socketAllOrders = null;

export const socketMiddleware = (wsUrl, wsUserUrl, WS_ACTIONS) => {
  return (store) => {
    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === WS_ACTIONS.WS_CONNECTION_START) {
        const { serverType, accessToken, callback } = payload;

        const cleanAccessToken = accessToken
          ? accessToken.replace("Bearer ", "")
          : "";
        let url = wsUrl;

        if (serverType === "user" && cleanAccessToken) {
          url = `${wsUserUrl}?token=${cleanAccessToken}`;
        }

        if (serverType === "user") {
          if (!socketUserOrders) {
            socketUserOrders = new WebSocket(url);
            socketUserOrders.onopen = (event) => {
              dispatch({
                type: WS_ACTIONS.WS_CONNECTION_SUCCESS,
                payload: event,
              });
              if (typeof callback === "function") callback();
            };
            socketUserOrders.onerror = (event) => {
              dispatch({
                type: WS_ACTIONS.WS_CONNECTION_ERROR,
                payload: event,
              });
            };

            socketUserOrders.onmessage = async (event) => {
              const { data } = event;
              const parsedData = JSON.parse(data);

              // проверка сообщения
              if (parsedData.message === "Invalid token") {
                try {
                  // обновление токена
                  const refreshedTokens = await refreshToken();
                  if (refreshedTokens) {
                    const accessToken = refreshedTokens.accessToken;
                    const url = `${wsUserUrl}?token=${accessToken.replace(
                      "Bearer ",
                      ""
                    )}`;
                    socketUserOrders = new WebSocket(url);

                    // Обработчики событий для нового сокета

                    socketUserOrders.onopen = (event) => {
                      dispatch({
                        type: WS_ACTIONS.WS_CONNECTION_SUCCESS,
                        payload: event,
                      });
                      if (typeof callback === "function") callback();
                    };
                    socketUserOrders.onerror = (event) => {
                      dispatch({
                        type: WS_ACTIONS.WS_CONNECTION_ERROR,
                        payload: event,
                      });
                    };
                    socketUserOrders.onmessage = (event) => {
                      const { data } = event;
                      const parsedData = JSON.parse(data);
                      dispatch({
                        type: WS_ACTIONS.WS_GET_DATA,
                        payload: parsedData,
                        serverType,
                      });
                    };
                    socketUserOrders.onclose = (event) => {
                      dispatch({
                        type: WS_ACTIONS.WS_CONNECTION_CLOSED,
                        payload: event,
                      });
                    };
                  }
                } catch (error) {
                  console.error("Failed to refresh token:", error);
                }
              } else {
                dispatch({
                  type: WS_ACTIONS.WS_GET_DATA,
                  payload: parsedData,
                  serverType,
                });
              }
            };
            socketUserOrders.onclose = (event) => {
              dispatch({
                type: WS_ACTIONS.WS_CONNECTION_CLOSED,
                payload: event,
              });
            };
          }
        } else {
          socketAllOrders = new WebSocket(url);
          socketAllOrders.onopen = (event) => {
            dispatch({
              type: WS_ACTIONS.WS_CONNECTION_SUCCESS,
              payload: event,
            });
          };
          socketAllOrders.onerror = (event) => {
            dispatch({ type: WS_ACTIONS.WS_CONNECTION_ERROR, payload: event });
          };
          socketAllOrders.onmessage = (event) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch({
              type: WS_ACTIONS.WS_GET_DATA,
              payload: parsedData,
              serverType,
            });
          };

          socketAllOrders.onclose = (event) => {
            dispatch({ type: WS_ACTIONS.WS_CONNECTION_CLOSED, payload: event });
            dispatch({ type: WS_ACTIONS.CLEAR_WS_DATA });
          };
        }
      }

      if (type === WS_ACTIONS.WS_SEND_DATA) {
        const data = JSON.stringify(payload);
        if (
          socketUserOrders &&
          socketUserOrders.readyState === WebSocket.OPEN
        ) {
          socketUserOrders.send(data);
        } else if (
          socketAllOrders &&
          socketAllOrders.readyState === WebSocket.OPEN
        ) {
          socketAllOrders.send(data);
        } else {
          console.error(
            "Не удалось отправить данные, т.к. соединение с WebSocket не открыто"
          );
        }
      }

      next(action);
    };
  };
};
