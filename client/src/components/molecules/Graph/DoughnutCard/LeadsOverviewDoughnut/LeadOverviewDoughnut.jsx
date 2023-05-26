import { Message } from "@/components/atoms/Message/Message";
import DoughnutCard from "../DoughnutCard";
import { Card } from "@/components/atoms/Card/Card";
import styles from "./LeadOverviewDoughnut.module.scss";

export const LeadOverviewDoughnut = ({ leadCount }) => {
  if (!leadCount) {
    return (
      <Card>
        <div className={styles.center}>
          <Message danger message="No data for this campaign" />
        </div>
      </Card>
    );
  }

  if (leadCount.all === 0) {
    return (
      <Card>
        <div className={styles.center}>
          <Message danger message="No data for this campaign" />
        </div>
      </Card>
    );
  }

  return (
    <DoughnutCard
      title="Leads overview"
      subtitle="Good vs. Should Review vs. Requires Review"
      data={{
        labels: ["Good", "Should Review", "Requires Review"],
        datasets: [
          {
            data: [
              leadCount.good,
              leadCount.should_review,
              leadCount.require_review,
            ],
            backgroundColor: [
              "rgb(104, 238, 77)",
              "rgb(255, 205, 86)",
              "rgb(255, 99, 132)",
            ],
          },
        ],
      }}
    />
  );
};
