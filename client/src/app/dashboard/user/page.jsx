"use client";
import styles from "./page.module.scss";
import { UpdateUserForm } from "@/components/molecules/Forms/UpdateUserForm/UpdateUserForm";
import { DashboardHeader } from "@/components/molecules/DashboardHeader/DashboardHeader";
import { Page } from "@/components/atoms/Page/Page";
export default function User() {
  return (
    <Page>
      <DashboardHeader title="Update User Settings" href="/dashboard" />
      <UpdateUserForm />
    </Page>
  );
}
