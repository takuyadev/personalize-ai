import styles from "./LeadDetails.module.scss";
import { useForm } from "react-hook-form";
import { Divider } from "@/components/atoms/Divider/Divider";
import { UpdateLeadForm } from "@/components/molecules/Forms/UpdateLeadForm/UpdateLeadForm";
import { LeadProfile } from "@/components/molecules/LeadProfile/LeadProfile";
import { updateLead } from "@/services/lead";
import { useMode } from "@/hooks/useMode";
import { Message } from "@/components/atoms/Message/Message";
import { submitGenerate } from "@/services/lead";

export const LeadDetails = ({ lead, campaignId, setData, ...props }) => {
  const { mode, transition } = useMode();

  const form = useForm({
    defaultValues: {
      first_name: lead.first_name,
      last_name: lead.last_name,
      email: lead.email,
      linkedin_url: lead.linkedin_url,
      website_url: lead.website_url,
      keywords: lead.keywords,
      personalization: lead.personalization,
      city: lead.city,
      company: lead.company,
      position: lead.position,
    },
  });

  const onSubmit = (formData) => {
    // Attempt to update data
    const fetchApi = async () => {
      transition("NONE");
      const data = await updateLead(campaignId, lead.id, formData);

      // If data returns unknown structure
      if (!data.first_name) {
        transition("ERROR");
        return;
      }

      // Set data if it passed
      transition("SUCCESS");
      setData(data);
    };
    fetchApi();
  };

  const onGenerate = async () => {
    const data = await submitGenerate(campaignId, lead.id);

    if (data) {
      setData((prev) => {
        const copy = { ...prev };
        copy.personalization = data.personalization;
        return copy;
      });
      return data.personalization;
    }
  };

  return (
    <section className={styles.container} {...props}>
      {mode === "SUCCESS" && (
        <Message success message="Successfully updated this lead!" />
      )}
      {mode === "ERROR" && (
        <Message warning message="Error updating this lead!" />
      )}
      <LeadProfile lead={lead} />
      <Divider />
      <UpdateLeadForm
        form={form}
        lead={lead}
        submitGenerate={onGenerate}
        onSubmit={onSubmit}
      />
    </section>
  );
};
