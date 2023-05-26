import { Loading } from "../Loading/Loading";
import styles from "./PrimaryButton.module.scss";

export const PrimaryButton = ({ children, danger, loading = false, ...props }) => {
  // Apply classes based on what was passed through the props
  const dangerClass = danger ? styles.button_danger : "";

  return (
    <button {...props} className={`${styles.button} ${dangerClass}`}>
      {loading && <Loading loading={loading} />}
      {children}
    </button>
  );
};
