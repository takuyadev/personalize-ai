"use client";
import { Page } from "@/components/atoms/Page/Page";
import styles from "./page.module.scss";
import { DashboardHeader } from "@/components/molecules/DashboardHeader/DashboardHeader";
import { ImportCsvForm } from "@/components/organisms/MultistepForm/Forms/ImportCsvForm/ImportCsvForm";

export default function NewCampaign() {
  return (
    <Page>
      <DashboardHeader
        href="/dashboard/campaigns/create"
        title="Create campaign"
      />
      <ImportCsvForm />
    </Page>
  );
}
