"use client";
import { useEffect, useState } from "react";
import { generatePersonalization, getSheetsFromGoogle, importLeadsFromGoogle } from "@/services/lead";
import { addCampaign } from "@/services/campaign";
import { GoogleApiForm } from "@/components/molecules/Forms/GoogleApiForm/GoogleApiForm";
import { CreateCampaignForm } from "@/components/molecules/Forms/CreateCampaignForm/CreateCampaignForm";
import { SelectGoogleSheetForm } from "@/components/molecules/Forms/SelectGoogleSheetForm/SelectGoogleSheetForm";
import { MultiStepForm } from "../../MultistepForm";
import { Card } from "@/components/atoms/Card/Card";

export const ImportGoogleForm = () => {
  const [token, setToken] = useState(null);
  const [sheetId, setSheetId] = useState(null);
  const [sheets, setSheets] = useState(null);

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

    // Import selected Google Sheet to Ddatabase
    const importResponse = await importLeadsFromGoogle(
      campaignId,
      sheetId,
      token.access_token,
    );

    // return error if importing had error
    if (!importResponse.ok) {
      return { error: "Could not import Google Sheets" };
    }

    // Generate personalization line
    const generateResponse = await generatePersonalization(campaignId);

    if (!generateResponse.ok) {
      return { error: "Could not generate personalization in campiagn!" };
    }

    return { success: "Successfully uploaded campaign!" };
  };

  // Add token and sheets props prior to passing to form
  const RenderSheetsForm = ({ onSubmit }) => {
    return (
      <SelectGoogleSheetForm
        onClick={(id) => {
          setSheetId(id);
          onSubmit(id);
        }}
        currentSheetId={sheetId}
        token={token}
        sheets={sheets}
      />
    );
  };

  // Once Google access token is loaded in, try fetching from server
  useEffect(() => {
    if (token) {
      const fetchApi = async () => {
        const data = await getSheetsFromGoogle(token.access_token);
        setSheets(data);
      };
      fetchApi();
    }
  }, [token]);

  return (
    <>
      {!token && (
        <Card>
          <GoogleApiForm onSubmit={setToken} />
        </Card>
      )}
      {token && (
        <MultiStepForm
          onComplete={onComplete}
          redirect="/dashboard/campaigns/"
          steps={[CreateCampaignForm, RenderSheetsForm]}
        />
      )}
    </>
  );
};
