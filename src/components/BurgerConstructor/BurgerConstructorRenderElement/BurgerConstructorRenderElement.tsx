import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

interface BurgerConstructorRenderElement {
  type: "top" | "bottom" | undefined;
  price: number;
  name: string;
  thumbnail: string;
  isLocked: boolean;
}

function BurgerConstructorRenderElement(props: BurgerConstructorRenderElement) {
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

export default BurgerConstructorRenderElement;
