import ModalStiles from "./Modal.module.css";
import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
const modalRoot = document.getElementById("react-modals");
function Modal(props) {
  return ReactDOM.createPortal(
    <ModalOverlay>
      <div className={ModalStiles.modal}>
        <div onClick={props.onClose}>{props.header}</div>
        {props.children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}
export default Modal;
