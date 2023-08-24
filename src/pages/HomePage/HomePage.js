import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const HomePage = (props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients ingredientsData={props.ingredientsData} />
      <BurgerConstructor />
    </DndProvider>
  );
};

export { HomePage };
