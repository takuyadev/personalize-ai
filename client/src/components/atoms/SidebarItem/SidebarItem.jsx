import styles from "./SidebarItem.module.scss";
import { FaBeer } from "react-icons/fa";

export const SidebarItem = ({ icon = <FaBeer />, label, ...props }) => {
  return (
    <li {...props} className={styles.item}>
      {icon}
      <span>{label}</span>
    </li>
  );
};
