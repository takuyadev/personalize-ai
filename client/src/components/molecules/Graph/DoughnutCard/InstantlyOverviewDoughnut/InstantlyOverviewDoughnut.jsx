"use client";
import DoughnutCard from "../DoughnutCard";
import { Card } from "@/components/atoms/Card/Card";
import { Message } from "@/components/atoms/Message/Message";

export const InstantlyOverviewDoughnut = ({ instantlyData }) => {
  if (!instantlyData) {
    return (
      <Card>
        <Message danger message="No data for this campaign" />
      </Card>
    );
  }

  return (
    <DoughnutCard
      title="Campaign overview"
      subtitle="Opened vs. Replied vs. Bounced vs. Unsubscribed"
      data={{
        labels: ["Opened", "Replied", "Bounced", "Unsubscribed"],
        datasets: [
          {
            data: [
              instantlyData.leads_who_read,
              instantlyData.leads_who_replied,
              instantlyData.bounced,
              instantlyData.unsubscribed,
            ],
            backgroundColor: [
              "rgb(2,143,16)",
              "rgb(6,0,255)",
              "rgb(245,158,11)",
              "rgb(244,63,94)",
            ],
          },
        ],
      }}
    />
  );
};
