import IngredientsStiles from "../BurgerIngredients.module.css";
import Modal from "../../Modal/Modal";
import React, { useState } from "react";
import ingredientType from "../../../utils/types";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
} from "../../../services/actions/Ingredients";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
function IngredientElement(item) {
  const dispatch = useDispatch();
  const setData = (item) => {
    dispatch({
      type: SET_INGREDIENT_DETAILS,
      item,
    });
  };
  const deleteData = () => {
    dispatch({
      type: DELETE_INGREDIENT_DETAILS,
    });
  };

  const data = useSelector((store) => store.ingredient.currentIngredient);
  //console.log(data);
  /* Обработчик состояния попапа */
  const [modal, setModal] = useState({ visible: false });
  //const { ingredients, setIngredients } = useContext(IngredientsData);
  // const { id, setId } = useContext(idContext);
  /*  Обработчики открытия/закрытия попапа */
  const handleOpenModal = () => {
    setModal({ visible: true });
    setData(item);
  };
  const handleCloseModal = () => {
    setModal({ visible: false });
    deleteData();
  };
  /*  Обработчики открытия/закрытия попапа */

  /* Добавляем содежимое в модальное окно конструктора */
  const modals = (
    <Modal onClose={handleCloseModal} setModal={setModal}>
      return <IngredientDetails item={data} />;
    </Modal>
  );

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={`${IngredientsStiles.element}`}
      >
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
