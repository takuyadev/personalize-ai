"use client"
import styles from "./LeadGallery.module.scss";
import { LeadCard } from "@/components/molecules/Cards/LeadCard/LeadCard";
import { Loading } from "@/components/atoms/Loading/Loading";
import { Message } from "@/components/atoms/Message/Message";
import { deleteLead } from "@/services/lead";

export const LeadGallery = ({
  leads,
  setData = console.log,
  campaignId,
  ...props
}) => {
  
  // Loading states
  if (!leads) {
    return (
      <span className={styles.center}>
        <Loading loading />;
      </span>
    );
  }

  if (leads.length === 0) {
    return (
      <span className={styles.center}>
        <Message danger message="No leads found with filter" />
      </span>
    );
  }

  // Deletes lead
  const onDelete = async (leadId) => {
    const data = await deleteLead(campaignId, leadId);

    // Update client side view, only if fetch returned data
    if (data) {
      setData((prev) => {
        // Copy array to avoid state mutation
        const copy = { ...prev };

        // Filter the deleted lead
        const filteredLeads = copy.leads.filter((lead) => lead.id !== leadId);

        // Return mutated copy
        return { ...copy, leads: filteredLeads };
      });
    }
  };

  return (
    <section {...props} className={styles.leads_container}>
      {leads.map((lead) => {
        return (
          <LeadCard
            key={lead.id}
            href={`/dashboard/campaigns/${campaignId}/${lead.id}`}
            isHover
            lead={lead}
            onDelete={onDelete}
          />
        );
      })}
    </section>
  );
};
