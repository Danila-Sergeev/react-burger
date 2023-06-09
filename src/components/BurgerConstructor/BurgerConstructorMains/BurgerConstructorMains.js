import React from "react";
import BurgerCosructorStiles from "../BurgerConstructor.module.css";
import {
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { REMOVE_ITEM, MOVE_ITEM } from "../../../services/actions/constructor";
export default function BurgerConstructorMains({ ingredient, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const ingredients = useSelector((store) => store.constr.items);
  const removeItemId = (id4) => {
    dispatch({ type: REMOVE_ITEM, id4 });
  };

  /* Захват элемента для перетаскивания внутри конструктора */
  const [, drag] = useDrag({
    type: "mains",
    item: { ingredient, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  /* Отпускаем элемент */
  const [, drop] = useDrop({
    accept: "mains",
    drop(item) {
      dropItem(item);
    },
  });

  const moveIngredient = (dragIndex, hoverIndex) => {
    const dragIngredient = ingredients[dragIndex];
    dispatch({ type: MOVE_ITEM, dragIndex, hoverIndex, dragIngredient });
  };
  const dropItem = (item) => {
    const dragIndex = item.index;
    const hoverIndex = index;
    if (dragIndex === hoverIndex) {
      return;
    }
    moveIngredient(dragIndex, hoverIndex);
    item.index = hoverIndex;
  };

  drag(drop(ref));

  return (
    <li className={`${BurgerCosructorStiles.ingredient} mb-4`} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => removeItemId(ingredient.id4)}
      />
    </li>
  );
}
