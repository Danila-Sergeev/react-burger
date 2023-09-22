import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import OrderExplication from "../../components/OrderExplication/OrderExplication";
import Modal from "../../components/Modal/Modal";
import styles from "./ModalOrderPage.module.css";
import {
  startWsConnection,
  wsConnectionClosed,
} from "../../services/actions/WebSocket";
import { getCookie } from "../../utils/cookie";
console.log("fdfd");
export const ModalOrderPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const background = location.state?.background;
  const { id } = useParams();
  console.log(id);
  const accessToken = getCookie("accessToken");
  const userOrders = useSelector((state) => state.wsUser.data?.orders);
  console.log(userOrders);
  const orders = useSelector((state) => state.ws.data?.orders);

  const ordersList = location.pathname.includes("feed") ? orders : userOrders;
  const order = ordersList?.find((order) => order._id === id);

  useEffect(() => {
    if (location.pathname.includes("/orders")) {
      dispatch(startWsConnection("user", accessToken));
    } else {
      dispatch(startWsConnection("orders"));
    }
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch, location, accessToken]);

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      {background ? (
        <Modal onClose={closeModal}>
          <OrderExplication order={id} inModal={true} />
        </Modal>
      ) : (
        <OrderExplication order={id} inModal={false} />
      )}
    </div>
  );
};
