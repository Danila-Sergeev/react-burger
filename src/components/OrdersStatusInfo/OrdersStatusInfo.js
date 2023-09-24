import styles from "./OrdersStatusInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import {
  startWsConnection,
  wsConnectionClosed,
} from "../../services/actions/WebSocket";
import { wsUrl } from "../../utils/constants";

const OrderStatusInfo = () => {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector((state) => state.ws);

  const [newOrdersReady, setNewOrdersReady] = useState([]);
  const [newOrdersInProgress, setNewOrdersInProgress] = useState([]);

  useEffect(() => {
    dispatch(startWsConnection(`${wsUrl}/all`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, []);

  useEffect(() => {
    if (orders && orders.orders) {
      const updatedOrdersReady = [];
      const updatedOrdersInProgress = [];

      for (let order of orders.orders) {
        if (order.status === "done") {
          updatedOrdersReady.push(order);
        } else {
          updatedOrdersInProgress.push(order);
        }
      }

      setNewOrdersReady(updatedOrdersReady);
      setNewOrdersInProgress(updatedOrdersInProgress);
    }
  }, [orders]);

  function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  const { doneList, preparingList } = useMemo(() => {
    return orders.reduce(
      (count, element) => {
        switch (element.status) {
          case "done":
            count.doneList.push(element.number);
            break;
          case "pending":
            count.preparingList.push(element.number);
            break;
          case "created":
            count.preparingList.push(element.number);
            break;
        }
        return count;
      },
      { doneList: [], preparingList: [] }
    );
  }, [orders]);

  const readyChunks = chunkArray(newOrdersReady, 10);
  const inProgressChunks = chunkArray(newOrdersInProgress, 10);

  return (
    <>
      <ul className={styles.section}>
        <li className={styles.container}>
          <div className={styles.status__box}>
            <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
            <div
              className={
                "text text_type_digits-default " + styles.column__container
              }
            >
              {doneList.map((item, index) => {
                return (
                  <div className={styles.counts_active} key={index}>
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.status__box}>
            <h3 className="text text_type_main-medium mb-6">В работе:</h3>
            <div className={styles.column__container}>
              <ul className={styles.column}>
                {preparingList.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        </li>
        <li className={styles.total__box}>
          <h3 className="text text_type_main-medium">
            Выполнено за все время:
          </h3>
          <p className={`${styles.digits} text text_type_digits-large`}>
            {total ? total.toLocaleString("ru-RU") : 0}
          </p>
        </li>
        <li className={styles.total__box}>
          <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
          <p className={`${styles.digits} text text_type_digits-large`}>
            {totalToday ? totalToday.toLocaleString("ru-RU") : 0}
          </p>
        </li>
      </ul>
    </>
  );
};

export default OrderStatusInfo;
