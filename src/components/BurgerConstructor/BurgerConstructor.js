import data from "../utils/data";
import BurgerCosructorStiles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorRenderElement from "./BurgerConstructorRenderElement/BurgerConstructorRenderElement";

function BurgerConstructor(props) {
  let k = 0;
  return (
    <section className={`${BurgerCosructorStiles.BurgerConstructor} mt-25`}>
      <div className={BurgerCosructorStiles.list_box}>
        {data.map((obj) => {
          if (obj._id === "60666c42cc7b410027a1a9b1") {
            return (
              <div className={BurgerCosructorStiles.list_element} key={obj._id}>
                <BurgerConstructorRenderElement
                  type={"top"}
                  price={obj.price}
                  text={obj.name}
                  thumbnail={obj.image}
                  isLocked={true}
                />
              </div>
            );
          }
        })}
        <ul className={BurgerCosructorStiles.list}>
          {data.map((obj) => {
            if (obj.type === "main" || obj.type === "sauce") {
              return (
                <div
                  className={BurgerCosructorStiles.list_element}
                  key={obj._id}
                >
                  <DragIcon />
                  <BurgerConstructorRenderElement
                    _id={obj._id}
                    price={obj.price}
                    text={obj.name}
                    thumbnail={obj.image}
                  />
                </div>
              );
            }
          })}
        </ul>
        {data.map((obj) => {
          if (obj._id === "60666c42cc7b410027a1a9b1") {
            return (
              <div className={BurgerCosructorStiles.list_element} key={obj._id}>
                <BurgerConstructorRenderElement
                  type={"bottom"}
                  _id={obj._id}
                  price={obj.price}
                  text={obj.name}
                  thumbnail={obj.image}
                />
              </div>
            );
          }
        })}
      </div>
      <div className={`${BurgerCosructorStiles.order_box} pt-10`}>
        <div className={BurgerCosructorStiles.all_price}>
          {data.map((obj) => {
            k += obj.price;
          })}
          <p className="text text_type_digits-medium">{k}</p>
          <CurrencyIcon />
        </div>
        <Button htmlType="button" type="primary" size="large">
          {props.button}
        </Button>
      </div>
    </section>
  );
}
export default BurgerConstructor;
