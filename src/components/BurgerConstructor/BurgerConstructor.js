import React from "react";
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
        <ConstructorElement
          type="top"
          isLocked={true}
          price={1255}
          text={"Краторная булка N-200i"}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
        <ul className={BurgerCosructorStiles.list}>
          {data.map((obj) => {
            if (obj.type === "main" || obj.type === "sauce") {
              return (
                <div className={BurgerCosructorStiles.list_element}>
                  <DragIcon />
                  <BurgerConstructorRenderElement
                    type={"bottom"}
                    key={obj._id}
                    price={obj.price}
                    text={obj.name}
                    thumbnail={obj.image}
                    {...obj}
                  />
                </div>
              );
            }
          })}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          price={1255}
          text={"Краторная булка N-200i"}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
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
