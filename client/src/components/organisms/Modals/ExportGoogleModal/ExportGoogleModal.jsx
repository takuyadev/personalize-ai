"use client";
import styles from "./ExportGoogleModal.module.scss";
import { useMode } from "@/hooks/useMode";
import { Message } from "@/components/atoms/Message/Message";
import { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { Loading } from "@/components/atoms/Loading/Loading";
import { Popup } from "@/components/molecules/Popup/Popup";
import { FaGoogle } from "react-icons/fa";
import { exportLeadsToGoogle } from "@/services/lead";
import { GoogleApiForm } from "@/components/molecules/Forms/GoogleApiForm/GoogleApiForm";

export const ExportGoogleModal = ({ campaignId }) => {
  const { mode, transition } = useMode("CONFIRM");
  const [isOpen, setIsOpen] = useState(false);

  // Handle google import
  const onGoogleImport = async (token) => {
    transition("LOADING");
    const data = await exportLeadsToGoogle(token, campaignId);
    if (data) {
      return transition("COMPLETE");
    }
    return transition("ERROR");
  };

  return (
    <Popup setIsOpen={setIsOpen} isOpen={isOpen} label={<FaGoogle />}>
      {mode === "CONFIRM" && (
        <>
          <FaExclamationCircle size={64} />
          <span>Confirm your export to Google Sheets:</span>
          <GoogleApiForm onSubmit={onGoogleImport} label="Export to Google" />
        </>
      )}
      {mode === "LOADING" && <Loading />}
      {mode === "COMPLETE" && (
        <Message success message="Successfully exported to Google Sheets!" />
      )}
      {mode === "ERROR" && (
        <Message danger message="Could not export to Google Sheets!" />
      )}
    </Popup>
  );
};
