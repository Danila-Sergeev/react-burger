import OrderStyles from "./OrderDetails.module.css";
import logo from "../../images/order accpeted/graphics.svg";

import { useDispatch, useSelector } from "react-redux";
function OrderDetails() {
  const orderNumder = useSelector((store) => store.order.orderNumber);
  return (
    <div className={OrderStyles.mainBox}>
      <h1 className={`${OrderStyles.number} text text_type_digits-large mt-30`}>
        {orderNumder}
      </h1>
      <h2 className={`${OrderStyles.id} text text_type_main-medium mt-6 mb-10`}>
        идентификатор заказа
      </h2>
      <img src={logo} className="mt-10 mb-10" />
      <h3
        className={`${OrderStyles.start} text text_type_main-small mt-10 mb-2`}
      >
        Ваш заказ начали готовить
      </h3>
      <h3 className="text text_type_main-small text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </h3>
    </div>
  );
}
export default OrderDetails;
