import IngredientsStiles from "../BurgerIngredients.module.css";
import Modal from "../../Modal/Modal";
import React, { useState, useEffect } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import IngredientDitales from "../../Details/IngredientDetails";
function IngredientElement(props) {
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
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === "Escape") {
        setModal({ visible: false });
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);
  /*  Обработчики открытия/закрытия попапа */

  /* Добавляем содежимое в модальное окно конструктора */
  const modals = (
    <Modal onClose={handleCloseModal}>
      {" "}
      <IngredientDitales items={props} />
    </Modal>
  );
  return (
    <>
      <button
        style={{ overflow: "hidden" }}
        onClick={handleOpenModal}
        className={`${IngredientsStiles.element}`}
      >
        <Counter className="counter" />
        <img src={props.image} alt={props.name} />
        <div className={`${IngredientsStiles.price_box} mt-1 mb-2`}>
          <p
            className={`${IngredientsStiles.price} text text_type_main-default mr-2`}
          >
            {props.price}
          </p>
          <CurrencyIcon />
        </div>
        <p className={`${IngredientsStiles.name} text text_type_main-default`}>
          {props.name}
        </p>
      </button>
      {modal.visible && modals}
    </>
  );
}
IngredientElement.propTypes = {
  IngredientElement: PropTypes.element,
};

export default IngredientElement;
