import styles from "./OrdersStatusInfo.module.css";
import { useTypedDispatch, useTypedSelector } from "../../utils/hoc";
import { useEffect, useState, useMemo, FC } from "react";
import {
  startWsConnection,
  wsConnectionClosed,
} from "../../services/actions/WebSocket";
import { wsUrl } from "../../utils/constants";
import { IOrderDetails } from "../../services/constants/constants";

const OrderStatusInfo: FC = () => {
  const dispatch = useTypedDispatch();
  const { orders, total, totalToday } = useTypedSelector((state) => state.ws);

  const [newOrdersReady, setNewOrdersReady] = useState<IOrderDetails[]>([]);
  const [newOrdersInProgress, setNewOrdersInProgress] = useState<
    IOrderDetails[]
  >([]);

  const NewOrders = orders.map((i) => i.orders);
  useEffect(() => {
    dispatch(startWsConnection(`${wsUrl}/all`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, []);

  useEffect(() => {
    if (orders && NewOrders) {
      const updatedOrdersReady = [];
      const updatedOrdersInProgress = [];

      for (let order of NewOrders) {
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

  function chunkArray<T>(array: T[], size: number): T[][] {
    const result: T[][] = [];
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
      { doneList: [], preparingList: [] } as {
        doneList: number[];
        preparingList: number[];
      }
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
