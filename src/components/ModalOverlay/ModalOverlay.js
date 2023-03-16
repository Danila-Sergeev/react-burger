import ModalOverlayStyles from "./ModalOverlay.module.css";
function ModalOverlay(props) {
  return (
    <div onClick={props.onClose} className={ModalOverlayStyles.ModalOverlay}>
      {props.children}
    </div>
  );
}
export default ModalOverlay;
