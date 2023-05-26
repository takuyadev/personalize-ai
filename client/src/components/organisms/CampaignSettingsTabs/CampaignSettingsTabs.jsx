import { Tabs } from "@/components/molecules/Tabs/Tabs";
import { useState } from "react";
import { SelectGoogleSheetForm } from "@/components/molecules/Forms/SelectGoogleSheetForm/SelectGoogleSheetForm";
import { GoogleApiForm } from "@/components/molecules/Forms/GoogleApiForm/GoogleApiForm";
import { SelectInstantlyCampaignForm } from "@/components/molecules/Forms/SelectInstantlyCampaign/SelectInstantlyCampaign";

// Status tabs settings
const TABS = [
  {
    label: "GOOGLE SHEETS",
  },
  {
    label: "INSTANTLY CAMPAIGNS",
  },
];

export const CampaignSettingsTabs = ({
  token,
  sheets,
  setToken,
  instantlyId,
  onSetSheetId,
  onSetInstantlyId,
  campaigns,
}) => {
  const [currentTab, setCurrentTab] = useState("GOOGLE SHEETS");
  return (
    <>
      <Tabs tabs={TABS} onClick={setCurrentTab} currentTab={currentTab} />
      {currentTab === "GOOGLE SHEETS" && (
        <>
          {!token && <GoogleApiForm onSubmit={setToken} />}
          <SelectGoogleSheetForm
            onClick={onSetSheetId}
            token={token && token.access_token}
            sheets={sheets}
          />
        </>
      )}
      {currentTab === "INSTANTLY CAMPAIGNS" && (
        <>
          <SelectInstantlyCampaignForm
            onClick={onSetInstantlyId}
            instantlyId={instantlyId}
            campaigns={campaigns}
          />
        </>
      )}
    </>
  );
};
