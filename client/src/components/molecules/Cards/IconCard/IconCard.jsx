import styles from "./IconCard.module.scss";
import { Card } from "@/components/atoms/Card/Card";

export const IconCard = ({ label, isHover, icon, ...props }) => {
  return (
    <Card isHover={isHover} {...props}>
      <div className={styles.card_wrapper}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </Card>
  );
};
