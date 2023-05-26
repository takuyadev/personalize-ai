import styles from "./Loading.module.scss";

export const Loading = ({ loading = true }) => {
  if (!loading) {
    return;
  }

  return <div className={styles["lds-dual-ring"]} />;
};
