import ModalStiles from "./Modal.module.css";
import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
const modalRoot = document.getElementById("react-modals");
function Modal(props) {
  return ReactDOM.createPortal(
    <ModalOverlay onClose={props.onClose}>
      <div className={ModalStiles.modal}>
        <button className={ModalStiles.close} onClick={props.onClose}>
          <CloseIcon />
        </button>
        {props.children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}
export default Modal;
