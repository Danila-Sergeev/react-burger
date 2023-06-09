import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import IngredientsStiles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientElements from "./IngredientsElements/IngredientsElements";
import ingredientType from "../../utils/types";
import { AllIngredientsData } from "../../services/apiContext";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/Ingredients";
import { useInView } from "react-intersection-observer";
import IngredientElement from "./IngredientElement/IngredientElement";

function BurgerIngredients({ ingredientsData }) {
  const [current, setCurrent] = React.useState("one");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const [bunRef, bunView] = useInView({ threshold: 0.1 });
  const [sauceRef, sauceView] = useInView({ threshold: 0.1 });
  const [mainRef, mainView] = useInView({ threshold: 0.1 });
  useEffect(() => {
    ingredientScroll();
  }, [bunView, sauceView, mainView]);
  const buns = React.useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );
  const sauces = React.useMemo(
    () => ingredients.filter((item) => item.type === "sauce"),
    [ingredients]
  );
  const mains = React.useMemo(
    () => ingredients.filter((item) => item.type === "main"),
    [ingredients]
  );

  const bunCart = [useSelector((store) => store.constr.bun)];
  const mainsCart = useSelector((store) => store.constr.items);

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
  const tabClick = (type) => {
    setCurrent(type);
    const section = document.getElementById(type);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  useEffect(() => {
    ingredientScroll();
  }, [bunView, sauceView, mainView]);

  const countCart = (ingredient, cart) => {
    const count = cart.reduce((acc, item) => {
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
        {ingredientsData.map((el) => {
          return el.title;
        })}
      </h1>
      <div className={`${IngredientsStiles.header_box} mt-10 mb-10`}>
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
              active={current === "bun"}
              onClick={() => tabClick("bun")}
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
              active={current === "sauce"}
              onClick={() => tabClick("sauce")}
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
              active={current === "main"}
              onClick={() => tabClick("main")}
            >
              {ingredientsData.map((el) => {
                return el.thrdNavText;
              })}
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
