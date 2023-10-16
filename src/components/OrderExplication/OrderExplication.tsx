import React from "react";
import { useMemo, useEffect, FC } from "react";
import {
  startWsConnection,
  wsConnectionClosed,
} from "../../services/actions/WebSocket";
import { formatDate, wsUrl } from "../../utils/constants";
import OrderImage from "../OrderImage/OrderImage";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderExplication.module.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { getCookie } from "../../utils/cookie";
import { Interface } from "readline";
import { useTypedDispatch, useTypedSelector } from "../../utils/hoc";
interface IOrderExplication {
  inModal: Boolean;
}
const OrderExplication: FC<IOrderExplication> = React.memo(({ inModal }) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const accessToken = getCookie("token");
  const ingredientList = useTypedSelector(
    (state) => state.ingredients.ingredients
  );
  const { id } = useParams();
  const location = useLocation();
  const orders = useTypedSelector((state) => state.ws.orders);

  const order = orders?.find((order) => order._id === id);

  useEffect(() => {
    if (location.pathname.includes("/orders")) {
      dispatch(startWsConnection(`${wsUrl}?token=${accessToken}`));
    } else {
      dispatch(startWsConnection(`${wsUrl}/all`));
    }
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch, location, accessToken]);
  let containerStyles = inModal
    ? styles.container
    : `${styles.container} ${styles.page}`;
  let totalPrice = 0;

  const ingredients = order?.ingredients;
  const ingredientCounts: { [key: string]: number } = {};

  if (ingredients) {
    ingredients.forEach((ingredientId) => {
      if (ingredientCounts[ingredientId]) {
        ingredientCounts[ingredientId]++;
      } else {
        ingredientCounts[ingredientId] = 1;
      }
    });
  }

  const { ingredientsMarkup, totalPrices } = useMemo(() => {
    let totalPrices = 0;
    const ingredientsMarkup = Object.entries(ingredientCounts).map(
      ([ingredientId, count]) => {
        const ingredient = ingredientList.find(
          (item) => item._id === ingredientId
        );
        if (!ingredient) return null;

        totalPrices += ingredient.price * count;

        return (
          <li key={ingredientId} className={styles.ingredient__container}>
            <OrderImage
              alt={ingredient.name}
              image={ingredient.image}
              count={count > 1 ? count : 0}
              extraCountClass={styles.explicit}
            />
            <span className={`${styles.name} text text_type_main-small`}>
              {ingredient.name}
            </span>
            <span className={`${styles.price} text text_type_digits-default`}>
              {`${count} x ${ingredient.price}`} <CurrencyIcon type="primary" />{" "}
            </span>
          </li>
        );
      }
    );
    return { ingredientsMarkup, totalPrices };
  }, [ingredientCounts, ingredientList]);

  let statusText = "";
  let statusStyle = "";
  if (!order) {
    return <div>Loading...</div>;
  }
  if (order.status === "done") {
    statusText = "Выполнен";
    statusStyle = styles.done;
  } else if (order.status === "pending") {
    statusText = "Готовится";
    statusStyle = styles.pending;
  } else if (order.status === "created") {
    statusText = "Создан";
    statusStyle = styles.created;
  }

  return (
    <div className={containerStyles}>
      <div className={styles.upper__box}>
        <p className="text text_type_digits-default mb-15">
          {order ? `#${order.number}` : ""}
        </p>
      </div>
      <h2 className="text text_type_main-medium mb-6 mt-2">
        {order ? order.name : ""}
      </h2>
      <p className={`text text_type_main-small mb-15 ${statusStyle}`}>
        {statusText}
      </p>
      <h3 className="text text_type_main-medium mb-6">Состав: </h3>
      <div className={styles.ingredients__container}>
        <div className={styles.image__container}>{ingredientsMarkup}</div>
      </div>
      <div className={styles.price__container}>
        <p className="text text_type_main-small text_color_inactive">
          {formatDate(order ? order.updatedAt : "")}
        </p>
        <p className={`${styles.price} text text_type_digits-default`}>
          {totalPrices}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
});

export default OrderExplication;
