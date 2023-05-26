import styles from "./Message.module.scss";
import { FaCheck } from "react-icons/fa";

export const Success = ({ message, ...props }) => {
  return (
    <div {...props} className={styles.container_success}>
      <FaCheck />
      {message}
    </div>
  );
};
