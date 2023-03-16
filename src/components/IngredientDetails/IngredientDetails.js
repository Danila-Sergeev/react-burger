import IngredientStyle from "./IngredientDetails.module.css";
import PropTypes from "prop-types";
function IngredientDitales({ items }) {
  return (
    <div className={IngredientStyle.mainBox}>
      <h1 className={`${IngredientStyle.title} text text_type_main-large`}>
        Детали ингредиента
      </h1>
      <img className="mt-25" src={items.image_large} alt={items.name}></img>
      <p className="text text_type_main-medium mb-8 mt-6">{items.name}</p>
      <ul className={`${IngredientStyle.list}`}>
        <li className={`${IngredientStyle.listItem} mb-15`}>
          <p className="text text_type_main-default text_color_inactive ">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2 ">
            {items.calories}
          </p>
        </li>
        <li className={IngredientStyle.listItem}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {items.proteins}
          </p>
        </li>
        <li className={IngredientStyle.listItem}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {items.fat}
          </p>
        </li>
        <li className={IngredientStyle.listItem}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {items.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDitales;
