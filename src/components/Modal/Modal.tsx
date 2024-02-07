import ModalStiles from "./Modal.module.css";
import React, { FC, useEffect, ReactNode } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
const modalRoot = document.getElementById("react-modals");

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ onClose, children }) => {
  /* Обработчик закрытия попапа на Esc */
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={ModalStiles.box}>
        <div className={ModalStiles.modal}>
          <button className={ModalStiles.close} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
