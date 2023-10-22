import IngredientStyle from "./IngredientDetails.module.css";
import { useParams } from "react-router-dom";
import { FC } from "react";
import { useTypedSelector } from "../../utils/hoc";

interface IIngredientDetails {
  fule: boolean;
}

const IngredientDetails: FC<IIngredientDetails> = (props) => {
  //const item = useSelector((store) => store.ingredient.currentIngredient);

  const allIngredients = useTypedSelector(
    (store) => store.ingredients.ingredients
  );
  const { ingredientId } = useParams();

  type Tingredient = {
    _id: string;
  };
  const item = allIngredients.find(
    (ingredient: Tingredient) => ingredient._id === ingredientId
  );

  if (!item) {
    return null;
  }

  return (
    <div className={IngredientStyle.mainBox}>
      <h1
        className={
          props.fule
            ? `${IngredientStyle.titleFule} text text_type_main-large`
            : `${IngredientStyle.title} text text_type_main-large`
        }
      >
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
};

export default IngredientDetails;
