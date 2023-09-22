import styles from "./FeedOrderMain.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  startWsConnection,
  wsConnectionClosed,
} from "../../services/actions/WebSocket";
import FeedOrder from "../FeedOrder/FeedOrder";

const OrderFeed = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.ws.data?.orders);

  useEffect(() => {
    dispatch(startWsConnection("orders"));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, []);

  return (
    <div className={styles.container}>
      {orders &&
        orders.map((order) => <FeedOrder key={order._id} order={order} />)}
    </div>
  );
};

export default OrderFeed;
