import styles from "./InstantlyCard.module.scss";
import { Card } from "@/components/atoms/Card/Card";

export const InstantlyCard = ({
  name,
  isHover,
  ...props
}) => {
  return (
    <Card isHover={isHover} {...props}>
      <header>
        <h2 className={styles.heading}>{name}</h2>
      </header>
      <div className={styles.count}></div>
    </Card>
  );
};
