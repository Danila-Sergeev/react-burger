import React from "react";
import PropTypes from "prop-types";
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
          {props.ingredientsData.map((el) => {
            return el.title;
          })}
        </h1>
        <nav className={IngredientsStiles.Ingredients_box}>
          <a
            href={`#${props.ingredientsData.map((el) => {
              return el.frstElement;
            })}`}
            className={IngredientsStiles.link}
          >
            <Tab
              value={props.ingredientsData.map((el) => {
                return el.firstNavText;
              })}
              active={
                current ===
                props.ingredientsData.map((el) => {
                  return el.firstNavText;
                })
              }
              onClick={setCurrent}
            >
              {props.ingredientsData.map((el) => {
                return el.firstNavText;
              })}
            </Tab>
          </a>
          <a
            href={`#${props.ingredientsData.map((el) => {
              return el.sndElement;
            })}`}
            className={IngredientsStiles.link}
          >
            <Tab
              value={props.ingredientsData.map((el) => {
                return el.secNavText;
              })}
              active={
                current ===
                props.ingredientsData.map((el) => {
                  return el.secNavText;
                })
              }
              onClick={setCurrent}
            >
              {props.ingredientsData.map((el) => {
                return el.secNavText;
              })}
            </Tab>
          </a>
          <a
            href={`#${props.ingredientsData.map((el) => {
              return el.thrdNavText;
            })}`}
            className={IngredientsStiles.link}
          >
            <Tab
              value={props.ingredientsData.map((el) => {
                return el.thrdNavText;
              })}
              active={
                current ===
                props.ingredientsData.map((el) => {
                  return el.thrdNavText;
                })
              }
              onClick={setCurrent}
            >
              {props.ingredientsData.map((el) => {
                return el.thrdNavText;
              })}
            </Tab>
          </a>
        </nav>
      </div>
      <div className={IngredientsStiles.components}>
        <IngredientElements
          _id={props.ingredientsData.map((el) => {
            return el.frstElement;
          })}
          ElementName={props.ingredientsData.map((el) => {
            return el.frstElement;
          })}
          type={"bun"}
        />
        <IngredientElements
          _id={props.ingredientsData.map((el) => {
            return el.sndElement;
          })}
          ElementName={props.ingredientsData.map((el) => {
            return el.sndElement;
          })}
          type={"sauce"}
        />
        <IngredientElements
          _id={props.ingredientsData.map((el) => {
            return el.thrdElement;
          })}
          ElementName={props.ingredientsData.map((el) => {
            return el.thrdElement;
          })}
          type={"main"}
        />
      </div>
    </section>
  );
}

export default BurgerIngredients;
