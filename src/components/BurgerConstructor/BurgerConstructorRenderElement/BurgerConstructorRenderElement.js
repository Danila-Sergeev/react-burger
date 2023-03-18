import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../../utils/types";
function BurgerConstructorRenderElement(props) {
  return (
    <ConstructorElement
      type={props.type}
      price={props.price}
      text={props.name}
      thumbnail={props.thumbnail}
      isLocked={props.isLocked}
    />
  );
}
BurgerConstructorRenderElement.propTypes = {
  type: ingredientType.type,
  price: ingredientType.price,
  name: ingredientType.name,
  thumbnail: PropTypes.string.isRequired,
  isLocked: PropTypes.bool,
};
export default BurgerConstructorRenderElement;
