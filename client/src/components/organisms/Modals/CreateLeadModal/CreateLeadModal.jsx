import { useState } from "react";
import { useMode } from "@/hooks/useMode";
import { CreateLeadForm } from "@/components/molecules/Forms/CreateLeadForm/CreateLeadForm";
import { Popup } from "@/components/molecules/Popup/Popup";
import { createLead, submitGenerate } from "@/services/lead";
import { Loading } from "@/components/atoms/Loading/Loading";
import { Message } from "@/components/atoms/Message/Message";
import {
  checkDanger,
  checkSuccess,
  checkWarning,
} from "@/utils/helpers/checkLeadStatus";

export const CreateLeadModal = ({
  form,
  setCampaignData,
  setLeadCount,
  campaignId,
  ...props
}) => {
  const { mode, transition } = useMode("NONE");
  const [isOpen, setIsOpen] = useState(false);

  // Close the modal after the user has submitted their data
  const handleSubmit = async (formData) => {
    // When uplaoding is checked, then show loading
    transition("LOADING", true);

    // Upload data to database
    const leadData = await createLead(campaignId, formData);
    const data = await submitGenerate(campaignId, leadData.id);

    // If data exists, set all mode to default and close
    if (!data) {
      // If data was not found, then an error occurred
      return transition("ERROR", true);
    }

    if (checkSuccess(data)) {
      setCampaignData((prev) => ({ ...prev, leads: [...prev.leads, data] }));
      setLeadCount((prev) => {
        const copy = { ...prev };
        copy.lead_count.all += 1;
        copy.lead_count.good += 1;
        return copy;
      });
      setIsOpen(false);
      transition("NONE", true);
      return form.reset();
    }

    if (checkWarning(data)) {
      setCampaignData((prev) => ({ ...prev, leads: [...prev.leads, data] }));
      setLeadCount((prev) => {
        const copy = { ...prev };
        copy.lead_count.all += 1;
        copy.lead_count.should_review += 1;
        return copy;
      });
      setIsOpen(false);
      transition("NONE", true);
      return form.reset();
    }

    if (checkDanger(data)) {
      setCampaignData((prev) => ({ ...prev, leads: [...prev.leads, data] }));
      setLeadCount((prev) => {
        const copy = { ...prev };
        copy.lead_count.all += 1;
        copy.lead_count.require_review += 1;
        return copy;
      });
      setIsOpen(false);
      transition("NONE", true);
      return form.reset();
    }
  };

  return (
    <Popup isOpen={isOpen} setIsOpen={setIsOpen} label="Create lead">
      {mode === "LOADING" && <Loading />}
      {mode === "ERROR" && <Message danger message="Error uploading lead!" />}
      {mode === "NONE" && (
        <CreateLeadForm {...props} onSubmit={handleSubmit} form={form} />
      )}
    </Popup>
  );
};

export default CreateLeadModal;
