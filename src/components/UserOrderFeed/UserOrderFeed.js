import styles from "./UserOrderFeed.module.css";
import UserOrderShield from "../../components/UserOrderShield/UserOrderShield";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCookie } from "../../utils/cookie";
import { startWsConnection } from "../../services/actions/WebSocket";
import { wsUrl } from "../../utils/constants";

const UserOrderFeed = () => {
  const dispatch = useDispatch();
  const accessToken = getCookie("token");
  const orders = useSelector((state) => state.ws.orders);
  useEffect(() => {
    dispatch(startWsConnection(`${wsUrl}?token=${accessToken}`));
  }, [dispatch, accessToken]);

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
