import styles from "./ExportInstantlyModal.module.scss";
import { PrimaryButton } from "@/components/atoms/Button/PrimaryButton";
import { Loading } from "@/components/atoms/Loading/Loading";
import { Message } from "@/components/atoms/Message/Message";
import { Popup } from "@/components/molecules/Popup/Popup";
import { useMode } from "@/hooks/useMode";
import { exportCampaignToInstantly } from "@/services/campaign";
import { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export const ExportInstantlyModal = ({ campaignId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mode, transition } = useMode("CONFIRM");

  const handleClick = async () => {
    transition("LOADING");
    const data = await exportCampaignToInstantly(campaignId);

    if (data) {
      return transition("SUCCESS");
    }

    return transition("ERROR");
  };
  return (
    <Popup
      label={
        <>
          <FaCheckCircle />
          Instantly
        </>
      }
      setIsOpen={setIsOpen}
      isOpen={isOpen}
    >
      {mode === "CONFIRM" && (
        <>
          <FaExclamationCircle size={64} />
          Would you like to export to Instantly?
          <PrimaryButton onClick={handleClick}>
            Yes, export to Instantly
          </PrimaryButton>
        </>
      )}

      {mode === "LOADING" && (
        <span className={styles.center}>
          <Loading />
        </span>
      )}

      {mode === "SUCCESS" && (
        <Message success message="Successfully exported to Instantly!" />
      )}

      {mode === "ERROR" && (
        <Message danger message="Could not export to Instantly" />
      )}
    </Popup>
  );
};
