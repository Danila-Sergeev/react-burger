import BurgerCosructorStiles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorRenderElement from "./BurgerConstructorRenderElement/BurgerConstructorRenderElement";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

function BurgerConstructor({ items }) {
  /* счетчик общей стоимости заказа */
  let fullPrice = 0;

  /* Обработчик состояния попапа */
  const [modal, setModal] = useState({ visible: false });

  /*  Обработчики открытия/закрытия попапа */
  const handleOpenModal = () => {
    setModal({ visible: true });
  };

  const handleCloseModal = () => {
    setModal({ visible: false });
  };

  /*  Обработчики открытия/закрытия попапа */

  /* Добавляем содежимое в модальное окно конструктора */
  const modals = (
    <Modal onClose={handleCloseModal} setModal={setModal}>
      <OrderDetails />
    </Modal>
  );

  return (
    <section className={`${BurgerCosructorStiles.BurgerConstructor} mt-25`}>
      <div className={BurgerCosructorStiles.list_box}>
        {items.data !== undefined &&
          items.data.map((obj) => {
            if (obj._id === "60d3b41abdacab0026a733c6") {
              return (
                <div
                  className={BurgerCosructorStiles.list_element}
                  key={obj._id}
                >
                  <BurgerConstructorRenderElement
                    type={"top"}
                    price={obj.price}
                    text={`${obj.name} (верх)`}
                    thumbnail={obj.image}
                    isLocked={true}
                  />
                </div>
              );
            }
          })}
        <ul className={BurgerCosructorStiles.list}>
          {items.data !== undefined &&
            items.data.map((obj) => {
              if (obj.type === "main" || obj.type === "sauce") {
                return (
                  <div
                    className={BurgerCosructorStiles.list_element}
                    key={obj._id}
                  >
                    <DragIcon />
                    <BurgerConstructorRenderElement
                      price={obj.price}
                      text={obj.name}
                      thumbnail={obj.image}
                    />
                  </div>
                );
              }
            })}
        </ul>
        {items.data !== undefined &&
          items.data.map((obj) => {
            if (obj._id === "60d3b41abdacab0026a733c6") {
              return (
                <div
                  className={BurgerCosructorStiles.list_element}
                  key={obj._id}
                >
                  <BurgerConstructorRenderElement
                    type={"bottom"}
                    _id={obj._id}
                    price={obj.price}
                    text={`${obj.name} (низ)`}
                    thumbnail={obj.image}
                  />
                </div>
              );
            }
          })}
      </div>
      <div className={`${BurgerCosructorStiles.order_box} pt-10`}>
        <div className={BurgerCosructorStiles.all_price}>
          {items.data !== undefined &&
            items.data.map((obj) => {
              fullPrice += obj.price;
            })}
          <p className="text text_type_digits-medium">{fullPrice}</p>
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
BurgerConstructor.propTypes = {
  BurgerConstructor: PropTypes.element,
  items: PropTypes.object.isRequired,
};
export default BurgerConstructor;
