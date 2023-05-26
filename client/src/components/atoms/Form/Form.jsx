import styles from "./Form.module.scss";

export const Form = ({ onSubmit, children, ...props }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
};
