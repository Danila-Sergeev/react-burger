import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
function BurgerConstructorRenderElement(obj) {
  return (
    <ConstructorElement
      type={obj.type}
      price={obj.price}
      text={obj.text}
      thumbnail={obj.thumbnail}
      isLocked={obj.isLocked}
    />
  );
}
BurgerConstructorRenderElement.propTypes = {
  type: PropTypes.string,
};
export default BurgerConstructorRenderElement;
