import { FC } from "react";
import styles from "./OrderImage.module.css";

interface IOrderImage {
  name?: string;
  image?: string;
  count: number;
  extraCountClass?: string;
  alt?: string;
}

const OrderImage: FC<IOrderImage> = ({
  name,
  image,
  count,
  extraCountClass,
}) => {
  return (
    <div className={`${styles.box}`}>
      <img src={image} alt={name} className={styles.image}></img>
      {count > 1 && (
        <span
          className={`${styles.count} ${extraCountClass} text text_type_digits-default`}
        >
          {`${count}`}
        </span>
      )}
    </div>
  );
};

export default OrderImage;
