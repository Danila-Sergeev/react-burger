import IngredientsStiles from "../BurgerIngredients.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
function IngredientElement(props) {
  return (
    <button className={`${IngredientsStiles.element}`}>
      <Counter className="counter" />
      <img src={props.image} alt={props.name} />
      <div className={`${IngredientsStiles.price_box} mt-1 mb-2`}>
        <p
          className={`${IngredientsStiles.price} text text_type_main-default mr-2`}
        >
          {props.price}
        </p>
        <CurrencyIcon />
      </div>
      <p className={`${IngredientsStiles.name} text text_type_main-default`}>
        {props.name}
      </p>
    </button>
  );
}
IngredientElement.propTypes = {
  IngredientElement: PropTypes.element,
};

export default IngredientElement;
