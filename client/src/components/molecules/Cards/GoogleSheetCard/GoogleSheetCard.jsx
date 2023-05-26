import styles from "./GoogleSheetCard.module.scss";
import { Card } from "@/components/atoms/Card/Card";

export const GoogleSheetCard = ({
  sheet,
  onClick,
  isHover,
  selected,
  ...props
}) => {
  return (
    <Card selected={selected} isHover={isHover} onClick={onClick} {...props}>
      <div className={styles.card_wrapper}>
        <span>{sheet.name}</span>
        <span className={styles.id}>{sheet.id}</span>
      </div>
    </Card>
  );
};
