import styles from "./CampaignGraphTabs.module.scss";
import { Tabs } from "@/components/molecules/Tabs/Tabs";
import { useState } from "react";
import CountDetails from "@/components/molecules/CountDetails/CountDetails";
import InstantlyDetails from "@/components/molecules/InstantlyDetails/InstantlyDetails";
import { InstantlyOverviewDoughnut } from "@/components/molecules/Graph/DoughnutCard/InstantlyOverviewDoughnut/InstantlyOverviewDoughnut";
import { LeadOverviewDoughnut } from "@/components/molecules/Graph/DoughnutCard/LeadsOverviewDoughnut/LeadOverviewDoughnut";

const TABS = [
  {
    label: "OVERVIEW",
  },
  {
    label: "INSTANTLY",
  },
];

export const CampaignGraphTabs = ({ leadCount, instantlyData }) => {
  const [currentTab, setCurrentTab] = useState("OVERVIEW");

  return (
    <section>
      <Tabs tabs={TABS} currentTab={currentTab} onClick={setCurrentTab} />
      {currentTab === "OVERVIEW" && (
        <div className={styles.data_container}>
          {leadCount && (
            <div className={styles.data_container}>
              <CountDetails data={leadCount} />
              <LeadOverviewDoughnut leadCount={leadCount.lead_count} />
            </div>
          )}
        </div>
      )}

      {currentTab === "INSTANTLY" && (
        <div className={styles.data_container}>
          <InstantlyDetails data={instantlyData} />
          <InstantlyOverviewDoughnut instantlyData={instantlyData} />
        </div>
      )}
    </section>
  );
};
