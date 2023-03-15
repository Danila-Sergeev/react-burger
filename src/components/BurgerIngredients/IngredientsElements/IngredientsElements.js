import IngredientsStiles from "../BurgerIngredients.module.css";
import IngredientElement from "../IngredientElement/IngredientElement";

function IngredientElements({ _id, type, data, ElementName }) {
  return (
    <div id={_id} className={`${IngredientsStiles.box_of_types} pb-10`}>
      <h2
        className={`${IngredientsStiles.name_of_type} text text_type_main-medium`}
      >
        {ElementName}
      </h2>
      <ul className={`${IngredientsStiles.elements} `}>
        {data.data !== undefined &&
          data.data.map((obj) => {
            if (obj.type === type) {
              return <IngredientElement key={obj._id} {...obj} />;
            }
          })}
      </ul>
    </div>
  );
}

export default IngredientElements;
