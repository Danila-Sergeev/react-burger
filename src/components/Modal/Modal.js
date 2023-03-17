import ModalStiles from "./Modal.module.css";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
const modalRoot = document.getElementById("react-modals");

function Modal({ onClose, children, setModal }) {
  /* Обработчик закрытия попапа на Esc */
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === "Escape") {
        setModal({ visible: false });
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={ModalStiles.box}>
        <div className={ModalStiles.modal}>
          <button className={ModalStiles.close} onClick={onClose}>
            <CloseIcon />
          </button>
          {children}
        </div>
      </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
