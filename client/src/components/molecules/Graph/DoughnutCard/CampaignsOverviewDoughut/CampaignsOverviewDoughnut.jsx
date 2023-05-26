import styles from "./CampaignsOverviewDoughnut.module.scss"
import { Card } from "@/components/atoms/Card/Card";
import DoughnutCard from "../DoughnutCard";
import { Message } from "@/components/atoms/Message/Message";

export const CampaignsOverviewDoughnut = ({ campaignCount }) => {
  if (!campaignCount) {
    return (
      <Card>
        <div className={styles.center}>
          <Message danger message="No data from campaigns" />
        </div>
      </Card>
    );
  }

  if (campaignCount.all === 0) {
    return (
      <Card>
        <div className={styles.center}>
          <Message danger message="No campaigns found" />
        </div>
      </Card>
    );
  }

  return (
    <DoughnutCard
      title="Campaigns overview"
      subtitle="Live Campaigns vs. Not published"
      data={{
        labels: ["Live Campaigns", "Not published "],
        datasets: [
          {
            data: [campaignCount.is_live, campaignCount.is_not_live],
            backgroundColor: ["rgb(104, 238, 77)", "rgb(255, 99, 132)"],
          },
        ],
      }}
    />
  );
};
