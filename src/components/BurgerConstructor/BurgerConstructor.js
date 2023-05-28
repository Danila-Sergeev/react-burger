import BurgerCosructorStiles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";
import React, { useContext, useState,useEffect } from "react";
import {  IngredientsData1 } from "../../services/apiContext";
import {
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorRenderElement from "./BurgerConstructorRenderElement/BurgerConstructorRenderElement";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import ingredientType from "../../utils/types";

function BurgerConstructor() {
  /* счетчик общей стоимости заказа */
  let fullPrice = 0;

  /* Обработчик состояния попапа */
  const [modal, setModal] = useState({ visible: false });
  const {data1,setData1} = useContext(IngredientsData1)
/*   useEffect(() => {
    //setData1(data);
    console.log('1')
    setData1(data);  
    console.log(data1)
   // setData(data)
  }, [data]); */

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
    <Modal onClose={handleCloseModal}>
      <OrderDetails />
    </Modal>
  );
  let count = 0;
  let count1 = 0;
  return (
    <section className={`${BurgerCosructorStiles.BurgerConstructor} mt-25`}>
      <div className={BurgerCosructorStiles.list_box}>
        {data1 !== undefined &&
          data1.map((obj) => {
            if (obj._id === "643d69a5c3f7b9001cfa093c" && count < 1) {
              count++;
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
          {data1 !== undefined &&
            data1.map((obj) => {
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
        {data1 !== undefined &&
          data1.map((obj) => {
            if (obj._id === "643d69a5c3f7b9001cfa093c" && count1 < 1) {
              count1++;
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
                  />
                </div>
              );
            }
          })}
      </div>
      <div className={`${BurgerCosructorStiles.order_box} pt-10`}>
        <div className={BurgerCosructorStiles.all_price}>
          {data1 !== undefined &&
            data1.map((obj) => {
              fullPrice += obj.price;
            })}
          <p className="name name_type_digits-medium">{fullPrice}</p>
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
