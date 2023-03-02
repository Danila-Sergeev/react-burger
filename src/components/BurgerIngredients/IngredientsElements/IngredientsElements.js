import data from "../../utils/data";
import React from "react";
import IngredientsStiles from "../BurgerIngredients.module.css";
import IngredientElement from "../IngredientElement/IngredientElement";

function IngredientElements(props) {
  return (
    <div className={`${IngredientsStiles.box_of_types} pb-10`}>
      <h2
        className={`${IngredientsStiles.name_of_type} text text_type_main-medium`}
      >
        {props.ElementName}
      </h2>
      <ul className={`${IngredientsStiles.elements} `}>
        {data.map((obj) => {
          if (obj.type === props.type) {
            return <IngredientElement key={obj._id} {...obj} />;
          }
        })}
      </ul>
    </div>
  );
}

export default IngredientElements;
