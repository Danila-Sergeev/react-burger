import IngredientsStiles from "../BurgerIngredients.module.css";
import Modal from "../../Modal/Modal";
import React, { useState } from "react";
import ingredientType from "../../../utils/types";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  SET_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
} from "../../../services/actions/Ingredients";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
import { useLocation, Link } from "react-router-dom";
function IngredientElement(props) {
  const { item, count } = props;
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

  /* Обработчик состояния попапа */
  const [modal, setModal] = useState(false);

  /*  Обработчики открытия/закрытия попапа */
  const handleOpenModal = () => {
    setModal(true);
    setData(item);
  };
  const handleCloseModal = () => {
    setModal(false);
    deleteData();
  };
  const location = useLocation();

  const ingredientId = item["_id"];

  /*  Обработчики открытия/закрытия попапа */

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <Link
      key={ingredientId}
      // Тут мы формируем динамический путь для нашего ингредиента
      to={`/ingredients/${ingredientId}`}
      // а также сохраняем в свойство background роут,
      // на котором была открыта наша модалка
      state={{ background: location }}
      className={IngredientsStiles.link}
    >
      <div>
        <li
          className={`${IngredientsStiles.element} mb-8`}
          onClick={handleOpenModal}
          ref={dragRef}
        >
          {count !== 0 ? (
            <Counter count={count} size="default" extraClass="m-1" />
          ) : (
            ""
          )}
          <img className="mb-1" src={item.image} alt={item.name} />
          <div className={IngredientsStiles.price}>
            <p className="text text_type_digits-default mb-1">{item.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p
            className={`${IngredientsStiles.title} text text_type_main-default`}
          >
            {item.name}
          </p>
        </li>
        {/*  {modal && (
        <Modal onClose={handleCloseModal} setModal={setModal}>
          {" "}
          <IngredientDetails />
        </Modal>
      )} */}
      </div>
    </Link>
  );
}
IngredientElement.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string,
  }).isRequired,
  count: PropTypes.number.isRequired,
};
export default IngredientElement;
