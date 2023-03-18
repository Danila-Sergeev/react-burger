import IngredientStyle from "./IngredientDetails.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
function IngredientDetails({ item }) {
  return (
    <div className={IngredientStyle.mainBox}>
      <h1 className={`${IngredientStyle.title} text text_type_main-large`}>
        Детали ингредиента
      </h1>
      <img className="mt-25" src={item.image_large} alt={item.name}></img>
      <p className="text text_type_main-medium mb-8 mt-6">{item.name}</p>
      <ul className={`${IngredientStyle.list}`}>
        <li className={`${IngredientStyle.listItem} mb-15`}>
          <p className="text text_type_main-default text_color_inactive ">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2 ">
            {item.calories}
          </p>
        </li>
        <li className={IngredientStyle.listItem}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {item.proteins}
          </p>
        </li>
        <li className={IngredientStyle.listItem}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {item.fat}
          </p>
        </li>
        <li className={IngredientStyle.listItem}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {item.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  item: ingredientType.isRequired,
};
export default IngredientDetails;
