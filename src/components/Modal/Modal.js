import ModalStiles from "./Modal.module.css";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
const modalRoot = document.getElementById("react-modals");
function Modal(props) {
  /* Обработчик закрытия попапа на Esc */

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={props.onClose} />
      <div className={ModalStiles.box}>
        <div className={ModalStiles.modal}>
          <button className={ModalStiles.close} onClick={props.onClose}>
            <CloseIcon />
          </button>
          {props.children}
        </div>
      </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
