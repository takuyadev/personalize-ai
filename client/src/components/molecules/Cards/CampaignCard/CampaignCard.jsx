import styles from "./CampaignCard.module.scss";
import { Card } from "@/components/atoms/Card/Card";
import { Status } from "@/components/atoms/Status/Status";
import { FaUser } from "react-icons/fa";

export const CampaignCard = ({
  name,
  isHover,
  is_live,
  created_at = "No date",
  total_leads = 0,
  _count, 
  ...props
}) => {
  return (
    <Card isHover={isHover} {...props}>
      <header>
        <h2 className={styles.heading}>{name}</h2>
      </header>
      <div className={styles.count}>
        <FaUser />
        <p>{_count.leads}</p>
      </div>
      <footer className={styles.footer}>
        <time className={styles.time}>
          {new Date(created_at).toLocaleString()}
        </time>
        <Status
          status={is_live ? "success" : "warning"}
          label={is_live ? "Live" : "Offline"}
        />
      </footer>
    </Card>
  );
};
