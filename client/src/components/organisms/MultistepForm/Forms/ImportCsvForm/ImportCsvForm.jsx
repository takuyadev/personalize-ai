"use client";

import styles from "./ImportCsv.module.scss";
import { addCampaign } from "@/services/campaign";
import { generatePersonalization, importLeadsFromCsv } from "@/services/lead";
import { MultiStepForm } from "../../MultistepForm";
import { CreateCampaignForm } from "@/components/molecules/Forms/CreateCampaignForm/CreateCampaignForm";
import { UploadCsvForm } from "@/components/molecules/Forms/UploadCsvForm/UploadCsvForm";

export const ImportCsvForm = () => {
  // Handle on submit logic
  const onComplete = async (formData) => {
    // Create new Campaign
    const createResponse = await addCampaign(formData);

    // return error if creation had error
    if (!createResponse.ok) {
      return { error: "Could not add campaign" };
    }

    // Get Campaign ID
    const { id: campaignId } = await createResponse.json();

    // Format CSV file into readable format in body request
    const data = new FormData();
    data.append("campaign", formData.campaign[0]);

    // Import selected Google Sheet to Database
    const importResponse = await importLeadsFromCsv(campaignId, data);

    if (!importResponse.ok) {
      return { error: "Could not import CSV" };
    }

    // Generate personalization line
    const generateResponse = await generatePersonalization(campaignId);

    if (!generateResponse.ok) {
      return { error: "Could not generate personalization in campiagn!" };
    }

    return {success: "Successfully uploaded campaign!"}
  };

  return (
    <MultiStepForm
      onComplete={onComplete}
      steps={[CreateCampaignForm, UploadCsvForm]}
      redirect="/dashboard/campaigns"
    />
  );
};
