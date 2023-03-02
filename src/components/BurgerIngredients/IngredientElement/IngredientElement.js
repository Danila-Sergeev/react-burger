import IngredientsStiles from "../BurgerIngredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
function IngredientElement(obj) {
  return (
    <li className={`${IngredientsStiles.element}`}>
      <img src={obj.image} />
      <div className={`${IngredientsStiles.price_box} mt-1 mb-2`}>
        <p
          className={`${IngredientsStiles.price} text text_type_main-default mr-2`}
        >
          {obj.price}
        </p>
        <CurrencyIcon />
      </div>
      <p className={`${IngredientsStiles.name} text text_type_main-default`}>
        {obj.name}
      </p>
    </li>
  );
}
export default IngredientElement;
