"use client"
import styles from "./page.module.scss";
import { ImportGoogleForm } from "@/components/organisms/MultistepForm/Forms/ImportGoogleForm/ImportGoogleForm";
import { DashboardHeader } from "@/components/molecules/DashboardHeader/DashboardHeader";
import { Page } from "@/components/atoms/Page/Page";

export default function GoogleImport() {
  return (
    <Page>
      <DashboardHeader
        href="/dashboard/campaigns/create"
        title="Import from Google Sheets"
      />
      <ImportGoogleForm/>
    </Page>
  );
}
