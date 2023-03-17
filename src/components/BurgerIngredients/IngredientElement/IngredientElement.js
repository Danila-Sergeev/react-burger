import IngredientsStiles from "../BurgerIngredients.module.css";
import Modal from "../../Modal/Modal";
import React, { useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
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

  /* Добавляем содежимое в модальное окно конструктора */
  const modals = (
    <Modal onClose={handleCloseModal} setModal={setModal}>
      {" "}
      <IngredientDetails item={props} />
    </Modal>
  );
  return (
    <>
      <button
        onClick={handleOpenModal}
        className={`${IngredientsStiles.element}`}
      >
        {<Counter count={1} className="counter" />}
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
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
};

export default IngredientElement;
