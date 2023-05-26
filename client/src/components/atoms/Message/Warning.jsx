import styles from "./Message.module.scss";
import { FaExclamationTriangle } from "react-icons/fa";

export const Warning = ({ message, ...props }) => {
  return (
    <div {...props} className={styles.container_warning}>
      <FaExclamationTriangle />
      {message}
    </div>
  );
};
