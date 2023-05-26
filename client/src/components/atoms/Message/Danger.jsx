import styles from "./Message.module.scss";
import { FaExclamationTriangle } from "react-icons/fa";

export const Danger = ({ message, ...props }) => {
  return (
    <div {...props} className={styles.container_danger}>
      <FaExclamationTriangle />
      {message}
    </div>
  );
};
