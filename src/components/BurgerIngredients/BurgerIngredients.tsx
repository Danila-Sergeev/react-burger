import React, { useEffect, FC } from "react";
import PropTypes from "prop-types";
import IngredientsStiles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredients } from "../../services/actions/Ingredients";
import { useInView } from "react-intersection-observer";
import IngredientElement from "./IngredientElement/IngredientElement";
import { type } from "os";
import { useTypedSelector } from "../../utils/hoc";

//Пропсом передаются названия секций
const BurgerIngredients: FC = () => {
  const [current, setCurrent] = React.useState("one");

  const ingredients = useTypedSelector(
    (store) => store.ingredients.ingredients
  );
  /* Определяем зону просмотра */
  const [bunRef, bunView] = useInView({ threshold: 0.1 });
  const [sauceRef, sauceView] = useInView({ threshold: 0.1 });
  const [mainRef, mainView] = useInView({ threshold: 0.1 });
  const ingredientScroll = () => {
    switch (true) {
      case bunView:
        setCurrent("bun");
        break;
      case sauceView:
        setCurrent("sauce");
        break;
      case mainView:
        setCurrent("main");
        break;
      default:
        break;
    }
  };
  const arr = null;
  useEffect(() => {
    ingredientScroll();
  }, [bunView, sauceView, mainView]);
  const buns = React.useMemo(
    () =>
      Array.isArray(ingredients)
        ? ingredients.filter((item) => item.type === "bun")
        : [],
    [ingredients]
  );
  const sauces = React.useMemo(
    () =>
      Array.isArray(ingredients)
        ? ingredients.filter((item) => item.type === "sauce")
        : [],
    [ingredients]
  );
  const mains = React.useMemo(
    () =>
      Array.isArray(ingredients)
        ? ingredients.filter((item) => item.type === "main")
        : [],
    [ingredients]
  );

  const bunCart = [useTypedSelector((store) => store.constr.bun)];
  const mainsCart = useTypedSelector((store) => store.constr.items);

  const tabClick = (type: string) => {
    setCurrent(type);
    const section = document.getElementById(type);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  useEffect(() => {
    ingredientScroll();
  }, [bunView, sauceView, mainView]);

  type Titem = {
    _id: string;
  };
  interface Ingredient {
    _id: string;
    type: string;
  }

  const countCart = (ingredient: Ingredient, cart: any) => {
    const count = cart.reduce((acc: number, item: Titem) => {
      if (item._id === ingredient._id) {
        ingredient.type !== "bun" ? (acc += 1) : (acc += 2);
      }
      return acc;
    }, 0);
    return count;
  };
  return (
    <section className="pt-10">
      <h1
        className={`${IngredientsStiles.title} text text_type_main-large mb-5`}
      >
        "Соберите бургер"
      </h1>
      <div className={`${IngredientsStiles.header_box} mt-10 mb-10`}>
        <nav className={IngredientsStiles.Ingredients_box}>
          <a href={"#Булки"} className={IngredientsStiles.link}>
            <Tab
              value="Булки"
              active={current === "bun"}
              onClick={() => tabClick("bun")}
            >
              "Булки"
            </Tab>
          </a>
          <a href={"#Соусы"} className={IngredientsStiles.link}>
            <Tab
              value="Соусы"
              active={current === "sauce"}
              onClick={() => tabClick("sauce")}
            >
              "Соусы"
            </Tab>
          </a>
          <a href={"#Начинки"} className={IngredientsStiles.link}>
            <Tab
              value="Начинки"
              active={current === "main"}
              onClick={() => tabClick("main")}
            >
              "Начинки"
            </Tab>
          </a>
        </nav>
      </div>

      <div className={IngredientsStiles.ingredients}>
        <div className="mt-2">
          <h2 className="text text_type_main-medium" ref={bunRef} id="bun">
            Булки
          </h2>
          <ul className={`${IngredientsStiles.elements} pt-6 pl-4`}>
            {buns.map((item) => {
              return (
                <IngredientElement
                  item={item}
                  key={item._id}
                  count={countCart(item, bunCart)}
                />
              );
            })}
          </ul>
        </div>
        <div className="mt-2">
          <h2 className="text text_type_main-medium" ref={sauceRef} id="sauce">
            Соусы
          </h2>
          <ul className={`${IngredientsStiles.elements} pt-6 pl-4`}>
            {sauces.map((item) => {
              return (
                <IngredientElement
                  item={item}
                  key={item._id}
                  count={countCart(item, mainsCart)}
                />
              );
            })}
          </ul>
        </div>
        <div className="mt-2">
          <h2 className="text text_type_main-medium" ref={mainRef} id="main">
            Начинки
          </h2>
          <ul className={`${IngredientsStiles.elements} pt-6 pl-4`}>
            {mains.map((item) => {
              return (
                <IngredientElement
                  item={item}
                  key={item._id}
                  count={countCart(item, mainsCart)}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
