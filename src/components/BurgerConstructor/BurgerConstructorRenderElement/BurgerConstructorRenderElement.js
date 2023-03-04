import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
function BurgerConstructorRenderElement(props) {
  return (
    <ConstructorElement
      type={props.type}
      price={props.price}
      text={props.text}
      thumbnail={props.thumbnail}
      isLocked={props.isLocked}
    />
  );
}
BurgerConstructorRenderElement.propTypes = {
  type: PropTypes.string,
};
export default BurgerConstructorRenderElement;
