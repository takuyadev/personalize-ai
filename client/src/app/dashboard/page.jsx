"use client";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/molecules/DashboardHeader/DashboardHeader";
import { getUserAnalytics } from "@/services/user";
import { UserDashboard } from "@/components/organisms/UserDashboard/UserDashboard";
import { Page } from "@/components/atoms/Page/Page";

export default function Dashboard() {
  const [data, setData] = useState(null);

  // push outside useEffect
  const fetchApi = async () => {
    const data = await getUserAnalytics();
    if (data) {
      return setData(data);
    }
  };

  // Load user analytics data
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <Page>
      <DashboardHeader title="Overview" href="/dashboard" />
      <UserDashboard data={data} />
    </Page>
  );
}
