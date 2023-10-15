import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useState } from "react";

const HomePage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />
      <BurgerConstructor />
    </DndProvider>
  );
};

export { HomePage };
