import styles from "./Dropdown.module.scss";
import { forwardRef } from "react";

export const Dropdown = forwardRef(({ children, ...props }, ref) => {
  return (
    <select className={styles.dropdown} {...props} ref={ref}>
      {children}
    </select>
  );
});
