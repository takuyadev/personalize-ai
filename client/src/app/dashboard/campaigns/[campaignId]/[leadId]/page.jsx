"use client";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { LeadDetails } from "@/components/organisms/LeadDetails/LeadDetails";
import { DashboardHeader } from "@/components/molecules/DashboardHeader/DashboardHeader";
import { Page } from "@/components/atoms/Page/Page";
import { getLead } from "@/services/lead";

// @desc Get information about a single lead
export default function Lead({ params }) {
  const { leadId, campaignId } = params;
  const [data, setData] = useState(null);

  // Fetch data from single lead if
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getLead(leadId, campaignId);
      setData(res);
    };
    fetchApi();
  }, []);

  return (
    <Page className={styles.container}>
      <DashboardHeader
        href={`/dashboard/campaigns/${params.campaignId}`}
        title="Lead details"
      />
      {data && (
        <LeadDetails campaignId={campaignId} lead={data} setData={setData} />
      )}
    </Page>
  );
}
