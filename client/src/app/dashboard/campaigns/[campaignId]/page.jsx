"use client";
import styles from "./page.module.scss";
import CampaignHeader from "@/components/organisms/CampaignHeader/CampaignHeader";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getCampaign } from "@/services/campaign";
import { CreateLeadModal } from "@/components/organisms/Modals/CreateLeadModal/CreateLeadModal";
import { LeadStatusTabs } from "@/components/organisms/LeadStatusTabs/LeadStatusTabs";
import { CampaignGraphTabs } from "@/components/organisms/CampaignGraphTabs/CampaignGraphTabs";
import { getCamapignAnalytics } from "@/services/campaign";
import { Page } from "@/components/atoms/Page/Page";

export default function SingleCampaign({ params }) {
  const form = useForm();
  const [campaignData, setCampaignData] = useState(null);
  const [leadCount, setLeadCount] = useState(null);

  // Set campaign data
  const fetchCampaignApi = async () => {
    const data = await getCampaign(params.campaignId);
    if (data) {
      setCampaignData(data);
    }
  };

  // Set analytics API
  const fetchAnalyticsApi = async () => {
    const data = await getCamapignAnalytics(params.campaignId);
    if (data) {
      return setLeadCount(data);
    }
  };

  // Grab data campaign data from server
  useEffect(() => {
    fetchCampaignApi();
  }, []);

  // Grab data campaign analytics from server
  useEffect(() => {
    fetchAnalyticsApi();
  }, []);

  return (
    <Page>
      <div className={styles.page}>
        {campaignData && (
          <CampaignHeader campaignId={params.campaignId} data={campaignData} />
        )}
        <CampaignGraphTabs leadCount={leadCount} />
        <CreateLeadModal
          campaignId={params.campaignId}
          setLeadCount={setLeadCount}
          setCampaignData={setCampaignData}
          form={form}
        />
        {campaignData && (
          <LeadStatusTabs
            setData={setCampaignData}
            data={campaignData}
            leads={campaignData.leads}
          />
        )}
      </div>
    </Page>
  );
}
