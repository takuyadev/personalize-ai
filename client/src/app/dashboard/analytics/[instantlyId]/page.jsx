"use client";

import { React, useState, useEffect } from "react";
import styles from "./page.module.scss";
import { BsFillPeopleFill, BsFillReplyFill } from "react-icons/bs";
import { HiOutlineMailOpen } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { ImCross } from "react-icons/im";
import { DashboardHeader } from "@/components/molecules/DashboardHeader/DashboardHeader";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale, // y
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale, // y
  Tooltip,
  Legend,
);

export default function Graph({ params }) {
  const [campaignName, setCampaignName] = useState("");
  const [leads, setLeads] = useState(0);
  const [opened, setOpened] = useState(0);
  const [replied, setReplied] = useState(0);
  const [bounced, setBounced] = useState(0);
  const [unsubscribed, setUnsubscribed] = useState(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/email/${params.instantlyId}`, {credentials: "include"})
      .then(res => {
        return res.json()
      })
      .then((data) => {
        setCampaignName(data.campaign_name);
        setLeads(data.total_leads);
        setOpened(data.leads_who_read);
        setReplied(data.leads_who_replied);
        setBounced(data.bounced);
        setUnsubscribed(data.unsubscribed);
      });
  }, []);

  const openRate = {
    labels: [campaignName.toString()],
    datasets: [
      {
        label: "Opened",
        data: [parseInt(opened)],
        backgroundColor: "rgb(2, 143, 17)",
        borderColor: "black",
        borderWidth: 5,
      },
      {
        label: "Replied",
        data: [parseInt(replied)],
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 5,
      },
      {
        label: "Bounced",
        data: [parseInt(bounced)],
        backgroundColor: "#f59e0b",
        borderColor: "black",
        borderWidth: 5,
      },
      {
        label: "Unsubscribed",
        data: [parseInt(unsubscribed)],
        backgroundColor: "#f43f5e",
        borderColor: "black",
        borderWidth: 5,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0,
        max: parseInt(leads),
      },
    },
  };

  return (
    <>
      <DashboardHeader title={campaignName} href="/dashboard/analytics" />
      <div className={styles.stats}>
        <h4 className={styles.campaignstats}>Campaign Stats</h4>
        <hr />
        <div className={styles.statslist}>
          <div className={styles.leads}>
            <div className={styles.statstitle}>
              <div className={styles.icon}>
                <BsFillPeopleFill />
              </div>
              <p>Leads</p>
            </div>
            <p className={styles.statsnumber}>{parseInt(leads)}</p>
          </div>
          <div className={styles.opened}>
            <div className={styles.statstitle}>
              <div className={styles.icon}>
                <HiOutlineMailOpen />
              </div>
              <p>Opened</p>
            </div>
            <p className={styles.statsnumber}>{parseInt(opened)}</p>
          </div>
          <div className={styles.replied}>
            <div className={styles.statstitle}>
              <div className={styles.icon}>
                <BsFillReplyFill />
              </div>
              <p>Replied</p>
            </div>
            <p className={styles.statsnumber}>{parseInt(replied)}</p>
          </div>
          <div className={styles.bounced}>
            <div className={styles.statstitle}>
              <div className={styles.icon}>
                <TbArrowBounce />
              </div>
              <p>Bounced</p>
            </div>
            <p className={styles.statsnumber}>{parseInt(bounced)}</p>
          </div>
          <div className={styles.unsubscribed}>
            <div className={styles.statstitle}>
              <div className={styles.icon}>
                <ImCross />
              </div>
              <p>Unsubscribed</p>
            </div>
            <p className={styles.statsnumber}>{parseInt(unsubscribed)}</p>
          </div>
        </div>
      </div>
      <div className={styles.graph}>
        <div
          className={styles.visualgraph}
          style={{
            padding: "20px",
            width: "50%",
            marginLeft: "auto",
          }}
        >
          <Bar data={openRate} options={options} />
        </div>
      </div>
    </>
  );
}
