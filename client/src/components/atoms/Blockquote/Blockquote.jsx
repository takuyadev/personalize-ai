import styles from "./Blockquote.module.scss";

export const Blockquote = ({ children, ...props }) => {
  return (
    <blockquote className={styles.blockquote} {...props}>
      {children}
    </blockquote>
  );
};
