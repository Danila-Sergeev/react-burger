import styles from "./UserOrderFeed.module.css";
import UserOrderShield from "../../components/UserOrderShield/UserOrderShield";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCookie } from "../../utils/cookie";
import {
  startWsConnection,
  wsConnectionClosed,
} from "../../services/actions/WebSocket";

const UserOrderFeed = () => {
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken");
  console.log(accessToken);
  const orders = useSelector((state) => state.wsUser.data?.orders);
  const connected = useSelector((state) => state.wsUser.connected);
  console.log(orders);
  useEffect(() => {
    dispatch(startWsConnection("user", accessToken));

    return () => {
      dispatch(wsConnectionClosed());
    };
  }, []);

  const reversedOrders = orders ? [...orders].reverse() : [];

  return (
    <div className={styles.container}>
      {reversedOrders.map((order) => (
        <UserOrderShield key={order._id} order={order} />
      ))}
    </div>
  );
};

export default UserOrderFeed;
