import ModalOverlayStyles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
function ModalOverlay(props) {
  return (
    <div onClick={props.onClose} className={ModalOverlayStyles.ModalOverlay}>
      {props.children}
    </div>
  );
}
ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
