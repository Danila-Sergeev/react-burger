import BurgerCosructorStiles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";
import React, { useContext, useState, useReducer, useEffect } from "react";
import { IngredientsData, PriceContext } from "../../services/apiContext";
import {
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorRenderElement from "./BurgerConstructorRenderElement/BurgerConstructorRenderElement";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import ingredientType from "../../utils/types";

const priceInitialState = { price: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "set":
      return { ...state, price: action.payload };
    case "reset":
      return priceInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function BurgerConstructor() {
  /* счетчик общей стоимости заказа */
  const [priceState, priceDispatcher] = useReducer(
    reducer,
    priceInitialState,
    undefined
  );
  priceState.price = 0;
  /* Обработчик состояния попапа */
  const [modal, setModal] = useState({ visible: false });
  const { ingredients } = useContext(IngredientsData);

  //priceDispatcher({ type: "set", payload: 10 });
  console.log(priceState);

  /*  Обработчики открытия/закрытия попапа */
  const handleOpenModal = () => {
    setModal({ visible: true });
  };

  const handleCloseModal = () => {
    setModal({ visible: false });
  };
  useEffect(() => {
    priceDispatcher({
      type: "set",
      payload: priceState.price,
    });
  }, [ingredients]);

  /*  Обработчики открытия/закрытия попапа */
  /* Добавляем содежимое в модальное окно конструктора */
  const modals = (
    <Modal onClose={handleCloseModal}>
      <OrderDetails />
    </Modal>
  );
  let count = 0;
  let count1 = 0;
  return (
    <section className={`${BurgerCosructorStiles.BurgerConstructor} mt-25`}>
      <div className={BurgerCosructorStiles.list_box}>
        {ingredients !== undefined &&
          ingredients.map((obj) => {
            if (obj.type === "bun" && count < 1) {
              count++;
              priceState.price += obj.price;
              return (
                <div
                  className={BurgerCosructorStiles.list_element}
                  key={Math.random()}
                >
                  <BurgerConstructorRenderElement
                    type={"top"}
                    price={obj.price}
                    name={`${obj.name} (верх)`}
                    thumbnail={obj.image}
                    isLocked={true}
                  />
                </div>
              );
            }
          })}
        <ul className={BurgerCosructorStiles.list}>
          {ingredients !== undefined &&
            ingredients.map((obj) => {
              if (obj.type === "main" || obj.type === "sauce") {
                return (
                  <div
                    className={BurgerCosructorStiles.list_element}
                    key={Math.random()}
                  >
                    <DragIcon />
                    <BurgerConstructorRenderElement
                      price={obj.price}
                      name={obj.name}
                      thumbnail={obj.image}
                    />
                  </div>
                );
              }
            })}
        </ul>
        {ingredients !== undefined &&
          ingredients.map((obj) => {
            if (obj.type === "bun" && count1 < 1) {
              count1++;
              priceState.price += obj.price;
              return (
                <div
                  className={BurgerCosructorStiles.list_element}
                  key={Math.random()}
                >
                  <BurgerConstructorRenderElement
                    type={"bottom"}
                    _id={obj._id}
                    price={obj.price}
                    name={`${obj.name} (низ)`}
                    thumbnail={obj.image}
                    isLocked={true}
                  />
                </div>
              );
            }
          })}
      </div>
      <div className={`${BurgerCosructorStiles.order_box} pt-10`}>
        <div className={BurgerCosructorStiles.all_price}>
          {ingredients !== undefined &&
            ingredients.map((obj) => {
              if (obj.type !== "bun") {
                priceState.price += obj.price;
              }
            })}
          <p className="text text_type_digits-medium">{priceState.price}</p>
          <CurrencyIcon />
        </div>
        <Button
          onClick={handleOpenModal}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
        {modal.visible && modals}
      </div>
    </section>
  );
}

export default BurgerConstructor;
