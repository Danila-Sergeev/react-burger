import IngredientsStiles from "../BurgerIngredients.module.css";
import React, { useEffect } from "react";
import IngredientElement from "../IngredientElement/IngredientElement";
import PropTypes from "prop-types";
import ingredientType from "../../../utils/types";

import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../../services/actions/Ingredients";
function IngredientElements({ Id, ElementName, type }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  const data = useSelector((store) => store.ingredients.ingredients);
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
              return <IngredientElement key={Math.random()} {...obj} />;
            }
          })}
      </ul>
    </div>
  );
}

/*  IngredientElements.propTypes = {
  type: PropTypes.string.isRequired,
  Id: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(ingredientType).isRequired,
  ElementName: PropTypes.array.isRequired,
}; */
export default IngredientElements;
