import styles from "./UserOrdersPage.module.css";
import UserOrderFeed from "../../components/UserOrderFeed/UserOrderFeed";
import { FC } from "react";
const UserOrdersPage: FC = () => {
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
