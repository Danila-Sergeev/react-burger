import ModalOverlayStyles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
import { FC, ReactNode } from "react";
interface IModalOverlay {
  onClose: () => void;
  children?: ReactNode;
}

const ModalOverlay: FC<IModalOverlay> = (props) => {
  return (
    <div onClick={props.onClose} className={ModalOverlayStyles.ModalOverlay}>
      {props.children}
    </div>
  );
};

export default ModalOverlay;
