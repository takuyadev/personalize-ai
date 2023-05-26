import styles from "./Footer.module.scss";

export const Footer = ({ ...props }) => {
  return (
    <footer className={styles.footer} {...props}>
      © Emai, 2023
    </footer>
  );
};
