import styles from "./InstantlyDetails.module.scss";
import { Card } from "@/components/atoms/Card/Card";
import { Message } from "@/components/atoms/Message/Message";
import { Chart, ArcElement } from "chart.js";

const InstantlyDetails = ({ data }) => {
  Chart.register(ArcElement);

  if (!data) {
    return (
      <Card>
        <Message danger message="No data found!" />
      </Card>
    );
  }
  return (
    <div className={styles.counter_container}>
        <Card>
          <h4>Total Leads</h4>
          <p>{data.total_leads} leads </p>
        </Card>

        <Card>
          <h4>Total Opened</h4>
          <p>{data.leads_who_read} opened </p>
        </Card>

        <Card>
          <h4>Total Replied</h4>
          <p>{data.leads_who_replied} replied </p>
        </Card>

        <Card>
          <h4>Total Bounced</h4>
          <p>{data.bounced} bounced </p>
        </Card>

        <Card>
          <h4>Total Unsubscribed</h4>
          <p>{data.unsubscribed} unsubscribed </p>
        </Card>
    </div>
  );
};

export default InstantlyDetails;
