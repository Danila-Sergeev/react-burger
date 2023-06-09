import IngredientsStiles from "../BurgerIngredients.module.css";
import Modal from "../../Modal/Modal";
import React, { useState } from "react";
import ingredientType from "../../../utils/types";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
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
function IngredientElement(props) {
  const { item } = props;
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

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li
      className={`${IngredientsStiles.element} mb-8`}
      onClick={props.openModal}
      ref={dragRef}
    >
      {props.count !== 0 ? (
        <Counter count={props.count} size="default" extraClass="m-1" />
      ) : (
        ""
      )}
      <img className="mb-1" src={props.item.image} alt={props.item.name} />
      <div className={IngredientsStiles.price}>
        <p className="text text_type_digits-default mb-1">{props.item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${IngredientsStiles.title} text text_type_main-default`}>
        {props.item.name}
      </p>
    </li>
  );
}
IngredientElement.propTypes = {
  item: ingredientType,
};

export default IngredientElement;
