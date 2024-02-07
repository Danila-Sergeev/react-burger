import React, { FC } from "react";
import BurgerCosructorStiles from "../BurgerConstructor.module.css";
import {
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useTypedDispatch, useTypedSelector } from "../../../utils/hoc";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { REMOVE_ITEM, MOVE_ITEM } from "../../../services/actions/constructor";

interface Ingredient {
  id4: string;
  name: string;
  price: number;
  image: string;
}

interface IBurgerConstructorMains {
  ingredient: Ingredient;
  index: number;
}

const BurgerConstructorMains: FC<IBurgerConstructorMains> = ({
  ingredient,
  index,
}) => {
  const dispatch = useTypedDispatch();
  const ref = useRef(null);
  const ingredients = useTypedSelector((store) => store.constr.items);
  const removeItemId = (id4: string) => {
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
    drop(item: { index: number }) {
      dropItem(item);
    },
  });

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    const dragIngredient = ingredients[dragIndex];
    dispatch({ type: MOVE_ITEM, dragIndex, hoverIndex, dragIngredient });
  };
  const dropItem = (item: { index: number }) => {
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
};

export { BurgerConstructorMains };
