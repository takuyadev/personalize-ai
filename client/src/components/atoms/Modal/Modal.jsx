import styles from "./Modal.module.scss";
import { SubtleButton } from "../../atoms/Button/SubtleButton";
import { AiOutlineClose } from "react-icons/ai";

export const Modal = ({
  open = false,
  onClose = () => {},
  children,
  ...props
}) => {
  return (
      <dialog open={open} className={styles.modal} {...props}>
        <div className={styles.modal_wrapper}>
          <span className={styles.close}>
            <SubtleButton type="button" onClick={onClose}>
              <AiOutlineClose />
            </SubtleButton>
          </span>
          {children}
        </div>
      </dialog>
  );
};
