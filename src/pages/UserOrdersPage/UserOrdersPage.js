import styles from "./UserOrdersPage.module.css";
import UserOrderFeed from "../../components/UserOrderFeed/UserOrderFeed";

const UserOrdersPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.orders__section}>
        <div className={styles.orders__container}>
          <UserOrderFeed />
        </div>
      </div>
    </section>
  );
};

export { UserOrdersPage };
