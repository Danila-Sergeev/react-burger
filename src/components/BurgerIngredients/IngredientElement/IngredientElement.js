import IngredientsStiles from "../BurgerIngredients.module.css";
import Modal from "../../Modal/Modal";
import React, { useState, useContext, useEffect } from "react";
import ingredientType from "../../../utils/types";
import PropTypes from "prop-types";
import { IngredientsData } from "../../../services/apiContext";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
function IngredientElement(item) {
  /* Обработчик состояния попапа */
  const [modal, setModal] = useState({ visible: false });
  const { ingredients, setIngredients } = useContext(IngredientsData);
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
      <IngredientDetails item={item} />
    </Modal>
  );
  const setter = () => {
    setIngredients([...ingredients, item]);
    console.log(ingredients);
  };

  return (
    <>
      <button onClick={setter} className={`${IngredientsStiles.element}`}>
        {<Counter count={1} className="counter" />}
        <img src={item.image} alt={item.name} />
        <div className={`${IngredientsStiles.price_box} mt-1 mb-2`}>
          <p
            className={`${IngredientsStiles.price} text text_type_main-default mr-2`}
          >
            {item.price}
          </p>
          <CurrencyIcon />
        </div>
        <p className={`${IngredientsStiles.name} text text_type_main-default`}>
          {item.name}
        </p>
      </button>
      {modal.visible && modals}
    </>
  );
}
IngredientElement.propTypes = {
  item: ingredientType,
};

export default IngredientElement;
