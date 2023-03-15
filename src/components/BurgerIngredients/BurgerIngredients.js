import React from "react";
import PropTypes from "prop-types";
import IngredientsStiles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientElements from "./IngredientsElements/IngredientsElements";
function BurgerIngredients({ ingredientsData, items }) {
  const [current, setCurrent] = React.useState("one");
  return (
    <section className={IngredientsStiles.ingredients}>
      <div className={`${IngredientsStiles.header_box} mt-10 mb-10`}>
        <h1
          className={`${IngredientsStiles.title} text text_type_main-large mb-5`}
        >
          {ingredientsData.map((el) => {
            return el.title;
          })}
        </h1>
        <nav className={IngredientsStiles.Ingredients_box}>
          <a
            href={`#${ingredientsData.map((el) => {
              return el.frstElement;
            })}`}
            className={IngredientsStiles.link}
          >
            <Tab
              value={ingredientsData.map((el) => {
                return el.firstNavText;
              })}
              active={
                current ===
                ingredientsData.map((el) => {
                  return el.firstNavText;
                })
              }
              onClick={setCurrent}
            >
              {ingredientsData.map((el) => {
                return el.firstNavText;
              })}
            </Tab>
          </a>
          <a
            href={`#${ingredientsData.map((el) => {
              return el.sndElement;
            })}`}
            className={IngredientsStiles.link}
          >
            <Tab
              value={ingredientsData.map((el) => {
                return el.secNavText;
              })}
              active={
                current ===
                ingredientsData.map((el) => {
                  return el.secNavText;
                })
              }
              onClick={setCurrent}
            >
              {ingredientsData.map((el) => {
                return el.secNavText;
              })}
            </Tab>
          </a>
          <a
            href={`#${ingredientsData.map((el) => {
              return el.thrdNavText;
            })}`}
            className={IngredientsStiles.link}
          >
            <Tab
              value={ingredientsData.map((el) => {
                return el.thrdNavText;
              })}
              active={
                current ===
                ingredientsData.map((el) => {
                  return el.thrdNavText;
                })
              }
              onClick={setCurrent}
            >
              {ingredientsData.map((el) => {
                return el.thrdNavText;
              })}
            </Tab>
          </a>
        </nav>
      </div>
      <div className={IngredientsStiles.components}>
        <IngredientElements
          data={items}
          _id={ingredientsData.map((el) => {
            return el.frstElement;
          })}
          ElementName={ingredientsData.map((el) => {
            return el.frstElement;
          })}
          type={"bun"}
        />
        <IngredientElements
          data={items}
          _id={ingredientsData.map((el) => {
            return el.sndElement;
          })}
          ElementName={ingredientsData.map((el) => {
            return el.sndElement;
          })}
          type={"sauce"}
        />
        <IngredientElements
          data={items}
          _id={ingredientsData.map((el) => {
            return el.thrdElement;
          })}
          ElementName={ingredientsData.map((el) => {
            return el.thrdElement;
          })}
          type={"main"}
        />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredientsData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      firstNavText: PropTypes.string.isRequired,
      secNavText: PropTypes.string.isRequired,
      thrdNavText: PropTypes.string.isRequired,
      frstElement: PropTypes.string.isRequired,
      sndElement: PropTypes.string.isRequired,
      thrdElement: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BurgerIngredients;
