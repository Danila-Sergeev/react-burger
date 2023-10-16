import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_DATA,
  WS_CONNECTION_CLOSED,
  CLEAR_WS_DATA,
  TWSActions,
} from "../actions/WebSocket";
import { IOrderDetails } from "../constants/constants";

type TWsState = {
  wsConnected: boolean;
  orders: Array<IOrderDetails>;
  total: number;
  totalToday: number;
  error: boolean | undefined;
  errMessage: string | null;
};

const initialState: TWsState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: false,
  errMessage: null,
};

export const wsReducer = (
  state = initialState,
  action: TWSActions
): TWsState => {
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
        orders: [action.payload.orders],
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
