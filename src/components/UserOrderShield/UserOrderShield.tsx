import React, { FC } from "react";
import { useTypedSelector } from "../../utils/hoc";
import { useMemo } from "react";
import { formatDate } from "../../utils/constants";
import OrderImage from "../OrderImage/OrderImage";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./UserOrderShield.module.css";
import { useNavigate, useMatch, useLocation, Link } from "react-router-dom";
import { IOrderDetails } from "../../services/constants/constants";
interface IUserOrderShield {
  order: IOrderDetails;
}

const UserOrderShield: FC<IUserOrderShield> = React.memo(({ order }) => {
  const ingredientList = useTypedSelector(
    (state) => state.ingredients.ingredients
  );
  const navigate = useNavigate();
  const location = useLocation();
  const match = useMatch("/feed/:id");
  const { id } = match?.params || {};
  let totalPrice = 0;

  const ingredients = order.ingredients;
  const ingredientCounts: { [key: string]: number } = {};

  ingredients.forEach((ingredientId) => {
    if (ingredientCounts[ingredientId]) {
      ingredientCounts[ingredientId]++;
    } else {
      ingredientCounts[ingredientId] = 1;
    }
  });

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
          <OrderImage
            key={ingredientId}
            alt={ingredient.name}
            image={ingredient.image}
            count={count > 1 ? count : 0}
          />
        );
      }
    );
    return { ingredientsMarkup, totalPrices };
  }, [ingredientCounts, ingredientList]);

  let statusText = "";
  let statusStyle = "";

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
  const handleClick = () => {
    if (id !== order._id) {
      navigate(`/profile/orders/${order._id}`, {
        state: { modal: true, background: location },
      });
    }
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.upper__box}>
        <p className="text text_type_digits-default">{`#${order.number}`}</p>
        <p className="text text_type_main-small text_color_inactive">
          {formatDate(order.updatedAt)}
        </p>
      </div>
      <p className={`text text_type_main-small mb-2 mt-2 ${statusStyle}`}>
        {statusText}
      </p>
      <h2 className="text text_type_main-medium mb-6 mt-2">{order.name}</h2>
      <div className={styles.ingredients__container}>
        <div className={styles.image__container}>{ingredientsMarkup}</div>
        <div className={styles.price__container}>
          <p className={`${styles.price} text text_type_digits-default`}>
            {totalPrices}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
});

export default UserOrderShield;
