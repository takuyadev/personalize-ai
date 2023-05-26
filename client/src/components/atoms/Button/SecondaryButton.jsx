import styles from "./SecondaryButton.module.scss";
export const SecondaryButton = ({ label = "Button", ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {props.children}
    </button>
  );
};
