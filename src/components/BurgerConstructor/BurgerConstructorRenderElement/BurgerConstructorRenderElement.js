import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
function BurgerConstructorRenderElement(props) {
  return (
    <ConstructorElement
      type={props.type}
      price={props.price}
      text={props.text}
      thumbnail={props.thumbnail}
    />
  );
}
export default BurgerConstructorRenderElement;
