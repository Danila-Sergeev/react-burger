import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./FeedOrder.module.css";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useMemo, useEffect } from "react";
import { formatDate } from "../../utils/constants";
import { useNavigate, useMatch, useLocation } from "react-router-dom";
import OrderImage from "../OrderImage/OrderImage";
import { useTypedSelector } from "../../utils/hoc";
import { IOrderDetails } from "../../services/constants/constants";
interface IFeedOrder {
  order: IOrderDetails;
}
const FeedOrder: FC<IFeedOrder> = ({ order }) => {
  const ingredientList = useTypedSelector(
    (state) => state.ingredients.ingredients
  );
  let totalPrice = 0;
  const navigate = useNavigate();
  const location = useLocation();
  const match = useMatch("/orders/:id");
  const { id } = match?.params || {};

  const ingredients = order.ingredients;
  /*  order.map((i) => console.log(i)) */
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
  const handleClick = () => {
    if (id !== order._id) {
      navigate(`/feed/${order._id}`, {
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
      <h2 className="text text_type_main-medium mb-6 mt-6">{order.name}</h2>
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
};
export default FeedOrder;
