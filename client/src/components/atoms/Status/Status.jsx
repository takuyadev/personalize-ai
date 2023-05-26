import styles from "./Status.module.scss";

const STATUS = {
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
};

export const Status = ({ status, label, ...props }) => {
  return (
    <div {...props} className={styles[status]}>
      <div className={styles["status-dot"]} />
      {label && <span>{label}</span>}
    </div>
  );
};
