import styles from "./TabItem.module.scss";

export const TabItem = ({ label, selected, onClick, ...props }) => {
  const selectedClass = selected ? styles.tab_selected : "";

  return (
    <li
      className={`${styles.tab} ${selectedClass}`}
      onClick={onClick}
      {...props}
    >
      {label}
    </li>
  );
};
