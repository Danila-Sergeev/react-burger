import styles from "./Feed.module.css";
import OrderStatusInfo from "../../components/OrdersStatusInfo/OrdersStatusInfo";
import OrderFeed from "../../components/FeedOrderMain/FeedOrderMain";

const FeedPage = () => {
  return (
    <section className={styles.section}>
      <h2 className={`text text_type_main-large ${styles.title}`}>
        Лента заказов
      </h2>
      <div className={styles.wrap}>
        <div className={styles.orders__section}>
          <div className={styles.orders__container}>
            <OrderFeed />
          </div>
        </div>
        <OrderStatusInfo />
      </div>
    </section>
  );
};

export { FeedPage };
