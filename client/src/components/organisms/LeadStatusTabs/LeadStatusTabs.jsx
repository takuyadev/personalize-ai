"use client";

import styles from "./LeadStatusTabs.module.scss";
import { useEffect, useState } from "react";
import { Tabs } from "@/components/molecules/Tabs/Tabs";
import { LeadGallery } from "../LeadGallery/LeadGallery";
import {
  checkDanger,
  checkSuccess,
  checkWarning,
} from "@/utils/helpers/checkLeadStatus";

// Status tabs settings
const TABS = [
  {
    label: "GOOD",
  },
  {
    label: "SHOULD REVIEW",
  },
  {
    label: "REQUIRE REVIEW",
  },
];

// Status tabs for filtering leads from database
export const LeadStatusTabs = ({ setData, data, ...props }) => {
  const [currentTab, setCurrentTab] = useState("GOOD");
  const [filteredData, setFilteredData] = useState(null);

  // Watch for tab status, filter data based on what tab is clicked
  useEffect(() => {
    let filteredData = "";
    // Only allow updates if lead is defined
    if (data) {
      if (currentTab === "GOOD") {
        filteredData = data.leads.filter(checkSuccess);
      }

      // Use if to determine parameter to pass to final function
      if (currentTab === "SHOULD REVIEW") {
        filteredData = data.leads.filter(checkWarning);
      }

      if (currentTab === "REQUIRE REVIEW") {
        filteredData = data.leads.filter(checkDanger);
      }
      setFilteredData(filteredData);
    }
  }, [currentTab, data]);

  return (
    <>
      <Tabs
        tabs={TABS}
        currentTab={currentTab}
        onClick={setCurrentTab}
        {...props}
      />
      {filteredData && (
        <LeadGallery
          leads={filteredData}
          setData={setData}
          campaignId={data.id}
        />
      )}
    </>
  );
};
