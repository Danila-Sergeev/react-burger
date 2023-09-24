import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_DATA,
  WS_CONNECTION_CLOSED,
  CLEAR_WS_DATA,
} from "../actions/WebSocket";
const initialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: false,
  errMessage: null,
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: true,
        errMessage: action.payload,
        wsConnected: false,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    case WS_GET_DATA:
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
