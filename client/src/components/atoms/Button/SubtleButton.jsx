import styles from "./SubtleButton.module.scss"
export const SubtleButton = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};
