import { FC } from "react";
import styles from "./OrderImage.module.css";
import PropTypes from "prop-types";

interface IOrderImage {
  name?: string;
  image?: string;
  count: number;
  extraCountClass?: any;
  alt?: any;
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
OrderImage.propTypes = {
  image: PropTypes.string.isRequired,
  extraCountClass: PropTypes.string,
};

export default OrderImage;
