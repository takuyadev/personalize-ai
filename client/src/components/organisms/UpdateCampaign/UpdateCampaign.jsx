import styles from "./UpdateCampaign.module.scss";
import { Divider } from "@/components/atoms/Divider/Divider";
import { UpdateCampaignForm } from "@/components/molecules/Forms/UpdateCampaignForm/UpdateCampaignForm";
import { getSheetsFromGoogle } from "@/services/lead";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  deleteCampaign,
  getCampaign,
  getInstantlyCampaigns,
  updateCampaign,
} from "@/services/campaign";
import { useRouter } from "next/navigation";
import { DeleteCampaignModal } from "../Modals/DeleteCampaignModal/DeleteCampaignModal";
import { CampaignSettingsTabs } from "../CampaignSettingsTabs/CampaignSettingsTabs";
import { getUser } from "@/services/user";
import { useMode } from "@/hooks/useMode";
import { Message } from "@/components/atoms/Message/Message";

export const UpdateCampaign = ({ campaignId }) => {
  const { mode, transition } = useMode();
  const [token, setToken] = useState(null);
  const [instantlyId, setInstantlyId] = useState(null);
  const [sheets, setSheets] = useState(null);
  const [instantlyCampaigns, setInstantlyCampaigns] = useState(null);
  const { setValue, watch, ...form } = useForm();
  const { push } = useRouter();

  const onSubmit = async (formData) => {
    const data = await updateCampaign(formData, campaignId);

    if (data) {
      transition("SUCCESS");
      setValue("name", data.name);
      setValue("googlesheet_id", data.googlesheet_id);
      return setValue("instantly_id", data.instantly_id);
    }
    transition("ERROR");
  };

  // Delete camapign from database, and redirect
  const onDelete = async () => {
    const res = await deleteCampaign(campaignId);
    if (res.ok) {
      push("/dashboard/campaigns");
    }
  };

  // Set the value of the input when sheet is selected
  const onSetSheetId = (id) => setValue("googlesheet_id", id);

  // Set the value of the input when sheet is selected
  const onSetInstantlyId = (id) => setValue("instantly_id", id);

  // If page loads, try fetching campaign
  // ! Probably should remove later when we use a global state library
  useEffect(() => {
    const fetchApi = async () => {
      transition("NONE");
      const data = await getCampaign(campaignId);

      // If data doesn't return null
      if (data) {
        setValue("name", data.name);
        setValue("googlesheet_id", data.googlesheet_id);
        setValue("instantly_id", data.instantly_id);
      }
    };
    fetchApi();
  }, []);

  // Search user and retrieve the Instantly ID
  useEffect(() => {
    // List all campaigns from Instantly
    if (instantlyId) {
      const fetchApi = async () => {
        const data = await getInstantlyCampaigns();
        console.log(instantlyId);

        // If data doesn't return null
        if (data) {
          return setInstantlyCampaigns(data);
        }

        setInstantlyCampaigns([]);
      };
      fetchApi();
    }
  }, [instantlyId]);

  // Search user and retrieve the Instantly ID
  useEffect(() => {
    const fetchApi = async () => {
      const data = await getUser();

      // If data doesn't return null
      if (data) {
        setInstantlyId(data.instantly_id);
      }
    };
    fetchApi();
  }, []);

  // Once Google access token is loaded in, try fetching from server
  useEffect(() => {
    if (token) {
      const fetchApi = async () => {
        const data = await getSheetsFromGoogle(token.access_token);

        // If data doesn't return null
        if (data) {
          setSheets(data);
        }
      };
      fetchApi();
    }
  }, [token]);

  return (
    <div className={styles.container}>
      {mode === "SUCCESS" && (
        <Message success message="Successfully updated campaign!" />
      )}
      {mode === "ERROR" && (
        <Message warning message="Error updating campaign!" />
      )}
      <UpdateCampaignForm form={form} onSubmit={onSubmit} />
      <Divider />

      <CampaignSettingsTabs
        token={token}
        sheets={sheets}
        instantlyId={instantlyId}
        campaigns={instantlyCampaigns}
        setToken={setToken}
        onSetSheetId={onSetSheetId}
        onSetInstantlyId={onSetInstantlyId}
      />

      <Divider />
      <DeleteCampaignModal onDelete={onDelete} />
    </div>
  );
};
