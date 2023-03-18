import IngredientsStiles from "../BurgerIngredients.module.css";
import IngredientElement from "../IngredientElement/IngredientElement";
import PropTypes from "prop-types";
import ingredientType from "../../../utils/types";

function IngredientElements({ Id, type, data, ElementName }) {
  return (
    <div id={Id} className={`${IngredientsStiles.box_of_types} pb-10`}>
      <h2
        className={`${IngredientsStiles.name_of_type} text text_type_main-medium`}
      >
        {ElementName}
      </h2>
      <ul className={`${IngredientsStiles.elements} `}>
        {data !== undefined &&
          data.map((obj) => {
            if (obj.type === type) {
              return <IngredientElement key={obj._id} {...obj} />;
            }
          })}
      </ul>
    </div>
  );
}

IngredientElements.propTypes = {
  type: PropTypes.string.isRequired,
  Id: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(ingredientType).isRequired,
  ElementName: PropTypes.array.isRequired,
};

export default IngredientElements;
