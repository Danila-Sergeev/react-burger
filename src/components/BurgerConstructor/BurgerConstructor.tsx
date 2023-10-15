import BurgerCosructorStiles from "./BurgerConstructor.module.css";
import React, { useState, useMemo, FC } from "react";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../services/actions/Ingredients";
import BurgerConstructorMains from "./BurgerConstructorMains/BurgerConstructorMains";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { ADD_ITEM, RESET_ITEM } from "../../services/actions/constructor";
import { RESET_ORDER } from "../../services/actions/Ingredients";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthChecked);
  const bunLocked = useSelector((store) => store.constr.bun);
  const mains = useSelector((store) => store.constr.items);
  /* Обработчик состояния попапа */
  const [modal, setModal] = useState(false);
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const dispatch = useDispatch();
  /*  Обработчики открытия/закрытия попапа */
  const handleOpenModal = () => {
    if (Object.keys(bunLocked).length !== 0) {
      const cartItems = [];
      cartItems.push(bunLocked?._id);
      mains.forEach((item) => cartItems.push(item._id));
      cartItems.push(bunLocked?._id);
      dispatch(getOrder(cartItems));
      setModal(true);
    }
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
    drop(item) {
      dispatch({ type: ADD_ITEM, item: { ...item, id4: uuidv4() } });
    },
  });

  /* счетчик общей стоимости заказа */

  const orderSum = useMemo(() => {
    let sum = 0;
    mains.forEach((item) => (sum += item.price));
    sum += bunLocked?.price * 2;
    return sum ? sum : 0;
  }, [mains, bunLocked]);

  return (
    <section className="pt-25 pl-4" ref={dropTarget}>
      <div className="ml-8">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={
            Object.keys(bunLocked).length !== 0
              ? bunLocked.name + " (верх)"
              : "Добавьте булку !"
          }
          price={Object.keys(bunLocked).length ? bunLocked.price : ""}
          thumbnail={Object.keys(bunLocked).length ? bunLocked.image : ""}
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
            Object.keys(bunLocked).length
              ? bunLocked.name + " (верх)"
              : "Добавьте булку !"
          }
          price={Object.keys(bunLocked).length ? bunLocked.price : ""}
          thumbnail={Object.keys(bunLocked).length ? bunLocked.image : ""}
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
