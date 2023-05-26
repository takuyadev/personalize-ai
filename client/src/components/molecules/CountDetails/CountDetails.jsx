import styles from "./CountDetails.module.scss";
import { Card } from "@/components/atoms/Card/Card";
import { Message } from "@/components/atoms/Message/Message";
import { Chart, ArcElement } from "chart.js";
import { Status } from "@/components/atoms/Status/Status";

const CountDetails = ({ data }) => {
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
      {/* Render based if campaign count is available in data */}
      {data.campaign_count && (
        <Card>
          <h4>Total Campaigns</h4>
          <p>{data.campaign_count.all} campaigns </p>
        </Card>
      )}

      {/* Render based if lead count is available in data */}
      {data.campaign_count && (
        <Card>
          <h4>Total Campaigns</h4>
          <p>{data.campaign_count.all} campaigns </p>
        </Card>
      )}

      {/* Render based if lead count is available in data */}
      {data.lead_count && (
        <>
          <Card>
            <h4>Total Leads</h4>
            <p>{data.lead_count.all} leads</p>
          </Card>
          <Status status="danger" label="To be reviewed" />
          <Card>
            <p>
              {data.lead_count.should_review +
                data.lead_count.require_review +
                " leads"}
            </p>
          </Card>
        </>
      )}

      {/* Render based if campaign count is available in data */}
      {data.campaign_count && (
        <>
          <Status status="danger" label="To be published" />
          <Card>
            <p>{data.campaign_count.is_live + " campaigns"}</p>
          </Card>
        </>
      )}
    </div>
  );
};

export default CountDetails;
