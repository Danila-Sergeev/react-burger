import React from "react";
import IngredientsStiles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientElements from "./IngredientsElements/IngredientsElements";
function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("one");
  return (
    <section className={IngredientsStiles.ingredients}>
      <div className={`${IngredientsStiles.header_box} mt-10 mb-10`}>
        <h1
          className={`${IngredientsStiles.title} text text_type_main-large mb-5`}
        >
          {props.title}
        </h1>
        <div className={IngredientsStiles.Ingredients_box}>
          <Tab
            value={props.firstNavText}
            active={current === props.firstNavText}
            onClick={setCurrent}
          >
            {props.firstNavText}
          </Tab>
          <Tab
            value={props.secNavText}
            active={current === props.secNavText}
            onClick={setCurrent}
          >
            {props.secNavText}
          </Tab>
          <Tab
            value={props.thrdNavText}
            active={current === props.thrdNavText}
            onClick={setCurrent}
          >
            {props.thrdNavText}
          </Tab>
        </div>
      </div>
      <div className={IngredientsStiles.components}>
        <IngredientElements ElementName={props.frstElement} type={"bun"} />
        <IngredientElements ElementName={props.sndElement} type={"sauce"} />
        <IngredientElements ElementName={props.thrdElement} type={"main"} />
      </div>
    </section>
  );
}

export default BurgerIngredients;
