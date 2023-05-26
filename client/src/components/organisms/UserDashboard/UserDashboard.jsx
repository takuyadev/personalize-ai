import styles from "./UserDashboard.module.scss"
import CountDetails from "@/components/molecules/CountDetails/CountDetails";
import { LeadOverviewDoughnut } from "@/components/molecules/Graph/DoughnutCard/LeadsOverviewDoughnut/LeadOverviewDoughnut";
import { CampaignsOverviewDoughnut } from "@/components/molecules/Graph/DoughnutCard/CampaignsOverviewDoughut/CampaignsOverviewDoughnut";
import { Loading } from "@/components/atoms/Loading/Loading";

export const UserDashboard = ({data}) => {
  return (
    <>
      {data ? (
        <div className={styles.data_container}>
          <CountDetails data={data} />
          <LeadOverviewDoughnut leadCount={data.lead_count} />
          <CampaignsOverviewDoughnut campaignCount={data.campaign_count} />
        </div>
      ) : (
        <span className={styles.center}>
          <Loading />
        </span>
      )}
    </>
  );
};

