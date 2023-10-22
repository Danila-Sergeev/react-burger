import BurgerCosructorStiles from "./BurgerConstructor.module.css";
import React, { useState, useMemo, FC, useEffect } from "react";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import OrderDetails from "../OrderDetails/OrderDetails";
import { getOrder } from "../../services/actions/Ingredients";
import { BurgerConstructorMains } from "./BurgerConstructorMains/BurgerConstructorMains";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_ITEM,
  RESET_ITEM,
  addIngridientAction,
} from "../../services/actions/constructor";
import { RESET_ORDER } from "../../services/actions/Ingredients";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useTypedDispatch, useTypedSelector } from "../../utils/hoc";
const BurgerConstructor: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useTypedSelector((state) => state.user.isAuthChecked);
  const bunLocked = useTypedSelector((store) => store.constr.bun);
  const mains = useTypedSelector((store) => store.constr.items);
  /* Обработчик состояния попапа */
  const [modal, setModal] = useState(false);
  const ingredients = useTypedSelector(
    (store) => store.ingredients.ingredients
  );
  const dispatch = useTypedDispatch();
  /*  Обработчики открытия/закрытия попапа */
  // console.log(bunLocked ? bunLocked.forEach((item) => item._id) : null);
  let bunLId = "";
  let bunPricce = 0;
  let bunImage = "";
  let bunName = "";

  if (bunLocked) {
    bunLocked.forEach(({ _id, price, name, image }) => {
      bunLId = _id;
      console.log(_id, price, image, name);

      bunPricce = price;
      bunImage = image;
      bunName = name;
    });
  }

  const handleOpenModal = () => {
    const cartItems = [];
    cartItems.push(bunLId);
    mains.forEach((item) => cartItems.push(item._id));
    cartItems.push(bunLId);
    dispatch(getOrder(cartItems));
    setModal(true);
  };
  const resetOrder = () => {
    dispatch({ type: RESET_ORDER });
  };
  const handleCloseModal = () => {
    setModal(false);
    dispatch({
      type: RESET_ITEM,
    });
    resetOrder();
  };
  const onClick = () => {
    if (isAuthenticated) {
      handleOpenModal();
    } else {
      navigate("/login", {
        replace: true,
        state: { from: location.pathname },
      });
    }
  };
  /*  Добавление перетаскиваемого элемента в конструктор */
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: object) {
      dispatch({ type: ADD_ITEM, item: { ...item, id4: uuidv4() } });
    },
  });

  /* счетчик общей стоимости заказа */

  const orderSum = useMemo(() => {
    let sum = 0;
    mains.forEach((item) => (sum += item.price));
    bunLocked ? (sum += bunPricce * 2) : (sum = 0);
    return sum ? sum : 0;
  }, [mains, bunLocked]);

  return (
    <section className="pt-25 pl-4" ref={dropTarget}>
      <div className="ml-8">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={
            bunLocked
              ? Object.keys(bunLocked).length !== 0
                ? bunName + " (верх)"
                : "Добавьте булку !"
              : ""
          }
          price={
            bunLocked ? (Object.keys(bunLocked).length ? bunPricce : 0) : 0
          }
          thumbnail={
            bunLocked ? (Object.keys(bunLocked).length ? bunImage : "") : ""
          }
        />
      </div>
      <ul className={BurgerCosructorStiles.ingredients}>
        {mains.map((item, index) => {
          return (
            <BurgerConstructorMains
              ingredient={item}
              index={index}
              key={item.id4}
            />
          );
        })}
      </ul>
      <div className="ml-8">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={
            bunLocked
              ? Object.keys(bunLocked).length !== 0
                ? bunName + " (верх)"
                : "Добавьте булку !"
              : ""
          }
          price={
            bunLocked ? (Object.keys(bunLocked).length ? bunPricce : 0) : 0
          }
          thumbnail={
            bunLocked ? (Object.keys(bunLocked).length ? bunImage : "") : ""
          }
        />
      </div>
      <div className={`${BurgerCosructorStiles.price} mt-10 mr-4`}>
        <p className="text text_type_digits-medium">
          {orderSum} <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="large" onClick={onClick}>
          Оформить заказ
        </Button>
      </div>

      {modal && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
