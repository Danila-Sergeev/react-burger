import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
function BurgerConstructorRenderElement(props: any) {
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
  type: PropTypes.string,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  isLocked: PropTypes.bool,
};
export default BurgerConstructorRenderElement;
