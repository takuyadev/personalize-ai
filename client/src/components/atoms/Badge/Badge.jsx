import styles from "./Badge.module.scss";
import { FaUser } from "react-icons/fa";

export const Badge = ({ icon = <FaUser />, label = "Default", ...props }) => {
  return (
    <span className={styles.badge} {...props}>
      {icon}
      <span>{label}</span>
    </span>
  );
};
