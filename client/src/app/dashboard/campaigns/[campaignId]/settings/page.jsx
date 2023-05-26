"use client";
import styles from "./page.module.scss";
import { DashboardHeader } from "@/components/molecules/DashboardHeader/DashboardHeader";
import { Page } from "@/components/atoms/Page/Page";
import { UpdateCampaign } from "@/components/organisms/UpdateCampaign/UpdateCampaign";

export default function Settings({ params }) {
  return (
    <Page className={styles.container}>
      <DashboardHeader
        href={`/dashboard/campaigns/${params.campaignId}`}
        title="Settings"
      />
      <UpdateCampaign campaignId={params.campaignId} />
    </Page>
  );
}
