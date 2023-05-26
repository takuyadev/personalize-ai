import path from "path";
import csv from "csvtojson";
import { google } from "googleapis";
import { Parser } from "@json2csv/plainjs";
import { prisma } from "#prisma/db";
import { removeTmpFile } from "#utils/removeTmpFile";
import { formatJsonToGoogleSheets } from "#utils/formatJsonToGoogleSheets";

// @desc Gets all campaign leads using token user_id + campaignId
// @route /campaigns/:campaignId/leads
// @method GET

export const getUserCampaignLeads = async (req, res, next) => {
  const campaignId = req.params.campaignId;

  // Gets all leads from selected campaign
  try {
    const leads = await prisma.lead.findMany({
      where: {
        campaign_id: campaignId,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    // Send all leads
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: "Could not get user's campaigns", err });
  }
};

// @desc Gets single lead, using token user_id + campaignId + leadId
// @route /campaigns/:campaignId/leads/:leadId
// @method GET

export const getUserCampaignLead = async (req, res, next) => {
  const campaignId = req.params.campaignId;

  // Get leadId from URL (convert to Number to avoid type error)
  const leadId = Number(req.params.leadId);

  try {
    // Gets single lead from selected campaign
    const lead = await prisma.lead.findFirst({
      where: {
        id: leadId,
        campaign_id: campaignId,
      },
    });

    // Send lead
    res.status(200).json(lead);
  } catch (err) {
    res.status(500).json({ error: "Could not find lead from campaign", err });
  }
};

// @desc Updates single lead with provided queries
// @route /campaigns/:campaignId/leads/
// @method POST

export const createUserCampaignLead = async (req, res, next) => {
  // Add campaign id to body request
  req.body.campaign_id = req.params.campaignId;

  try {
    // Try to update user using request body
    const lead = await prisma.lead.create({
      data: req.body,
    });

    // Return deleted on success
    res.status(200).json(lead);
  } catch (err) {
    // Return error if failed to delete
    res.status(500).json({ error: "Could not create lead" });
  }
};

// @desc Updates single lead with provided queries
// @route /campaigns/:campaignId/leads/:leadId
// @method PUT

export const updateUserCampaignLead = async (req, res, next) => {
  const leadId = Number(req.params.leadId);

  try {
    // Try to update user using request body
    const lead = await prisma.lead.update({
      where: {
        id: leadId,
      },
      data: req.body,
    });

    // Return deleted on success
    res.status(200).json(lead);
  } catch (err) {
    // Return error if failed to delete
    res.status(500).json({ error: "Could not update lead: " + leadId });
  }
};

// @desc Deletes single lead with provided queries
// @route /campaigns/:campaignId/leads/:leadId
// @method DELETE

export const deleteUserCampaignLead = async (req, res, next) => {
  const leadId = Number(req.params.leadId);

  try {
    // Try to delete user from database
    const lead = await prisma.lead.delete({
      where: {
        id: leadId,
      },
    });

    // Return deleted on success
    res.status(200).json(lead);
  } catch (err) {
    // Return error if failed to delete
    res.status(500).json({ error: "Could not delete lead: " + leadId });
  }
};

// @desc Uploads single campaign to database with CSV file
// @route /campaigns/:campaignId/leads/:leadId
// @method POST

export const importLeadsCsv = async (req, res, next) => {
  // If files is not provided from user
  if (!req.files) {
    return res.status(500).json({ error: "Please upload a file" });
  }
  // If file type is not a CSV file
  if (req.files.campaign.mimetype !== "text/csv") {
    return res.status(500).json({ error: "Please upload a CSV file" });
  }

  try {
    // Get campaign ID from parameter
    const campaignId = req.params.campaignId;

    // Converts uploaded file, and removes temp CSV file
    const csvPath = path.resolve(req.files.campaign.tempFilePath);
    let jsonFormat = await csv().fromFile(csvPath);

    // Add campaign_id to add foreign key
    jsonFormat = jsonFormat.map((data) => {
      data.campaign_id = campaignId;
      return data;
    });

    // Remove temporary file from server after
    removeTmpFile(csvPath);

    // Import into database, if permissions pass
    await prisma.lead.createMany({
      data: jsonFormat,
    });

    // Return json csv if operation was success
    res.status(200).json(jsonFormat);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Could not upload campaign to database", err });
  }
};

// @desc Download JSON leads as CSV to client
// @route /campaigns/export/:campaignId
// @method GET

export const exportLeadCsv = async (req, res, next) => {
  try {
    const campaignId = req.params.campaignId;

    // Check if campaign ID was provided
    if (!campaignId) {
      res.status(500).json({
        error: "Please provide campaign id",
      });
    }

    // Get campaign name from database
    const campaign = await prisma.campaign.findUnique({
      where: {
        id: campaignId,
      },
      select: {
        name: true,
      },
    });

    // Search for all leads with associated campaign id
    const leads = await prisma.lead.findMany({
      where: {
        campaign_id: campaignId,
      },
    });

    // Setup converting JSON to CSV
    const parser = new Parser({});
    const csv = parser.parse(leads);

    // Send file as attachment
    res.attachment(`${campaign.name}-leads.csv`).send(csv);
  } catch (err) {
    res.status(500).json({ error: "Error downloading CSV", err });
  }
};

// @desc Export campaign leads to Google Sheets
// @route /campaigns/export/:campaignId
// @method GET

export const exportLeadsToGoogle = async (req, res, next) => {
  const campaignId = req.params.campaignId;

  // Get Google Sheet ID from campaign
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: campaignId,
    },
    select: {
      name: true,
      googlesheet_id: true,
    },
  });

  // If no Google sheet is associated with campaign
  if (!campaign.googlesheet_id) {
    return res
      .status(500)
      .json({ error: `No Google Sheet is associated with ${campaign.name}` });
  }

  // Assign to variable if id exists
  const spreadsheetId = campaign.googlesheet_id;

  // If either parameters was not found, return error
  if (!campaignId || !spreadsheetId) {
    return res
      .status(500)
      .json({ error: "Missing parameters for exporting to Google Sheets" });
  }

  try {
    // Search for all leads with associated campaign id
    const leads = await prisma.lead.findMany({
      where: {
        campaign_id: campaignId,
      },
    });

    // Get current date in readable format
    const date = new Date();
    const currentDate = date.toLocaleDateString();
    const currentTime = date.toLocaleTimeString();

    // Set title using current date to prevent conflicts
    const title = `EXPORT: ${currentDate}, ${currentTime}`;

    // Make add sheet request
    const addSheetOptions = {
      spreadsheetId: spreadsheetId,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title,
              },
            },
          },
        ],
      },
    };

    // Connect to Google Sheet API using auth
    const sheets = google.sheets({ version: "v4", auth: req.auth });

    // Create new sheet within sheet
    await sheets.spreadsheets.batchUpdate(addSheetOptions);

    // Convert JSON from database to Google Sheet readable format
    const sheetFormat = formatJsonToGoogleSheets(leads);

    // Setup options for spreadsheet
    const options = {
      data: {
        range: title,
        values: sheetFormat,
      },
      valueInputOption: "RAW",
    };

    // Update newly created sheet
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      resource: options,
    });

    // Return leads json if success
    res.status(200).json(leads);
  } catch (err) {
    // If any error occured, call 500
    res.status(500).json({ error: "Error uploading CSV to Google", err });
  }
};

// @desc Update Google Sheet ID associated to campaign
// @route /campaigns/update/google/:campaignId
// @method PUT

export const updateCampaignGoogleSheetId = async (req, res, next) => {
  const { campaignId } = req.params;
  const { googlesheet_id } = req.body;

  // If either parameters was not found, return error
  if (!campaignId || !googlesheet_id) {
    return res
      .status(500)
      .json({ error: "Missing parameters for updating Google Sheet Id" });
  }

  try {
    // Update campaign to new google sheet id
    const result = await prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        googlesheet_id,
      },
    });

    // If updating had no issues, send success
    res.status(200).json(result);
  } catch (err) {
    // Return error on anything that got caught between the try block
    res.status(500).json({
      error: "Could not update campaign with Google Sheet " + googlesheet_id,
      err,
    });
  }
};

// @desc Get list of Google sheets to look through using Google Drive
// @route /campaigns/search/google
// @method GET

export const getGoogleSheets = async (req, res, next) => {
  try {
    // Uses auth, passed from checkGoogleApiCredentials middleware
    const drive = google.drive({
      version: "v3",
      auth: req.auth,
    });

    // Gets all files that are marked as spreadsheets
    const files = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
    });

    // Returns all spreadsheets
    res.status(200).json(files.data.files);
  } catch (err) {
    res.status(500).json({ error: "Could not read Google Drive", err });
  }
};

// @desc Imports single Google sheet to leads under campaign
// @route /campaigns/import/google/:campaignId/
// @method POST

export const importLeadsGoogleSheet = async (req, res, next) => {
  // Get Spreadsheet Id from URL Params
  const { googlesheet_id: spreadsheetId } = req.body;
  const campaignId = req.params.campaignId;

  // Connect to Google Drive
  const service = google.drive({ version: "v3", auth: req.auth });

  try {
    // Export file from drive as CSV
    const file = await service.files.export({
      fileId: spreadsheetId,
      mimeType: "text/csv",
    });

    // If file did not return anything
    if (!file) {
      return res.status(500).json({ error: "Could not return file!" });
    }

    // Convert downloaded CSV to JSON
    let jsonFormat = await csv().fromString(file.data);

    // Add foreign key campaign id to JSON before uploading
    jsonFormat = jsonFormat.map((data) => {
      data.campaign_id = campaignId;
      return data;
    });

    // Create all leads from google sheet
    await prisma.lead.createMany({
      data: jsonFormat,
    });

    // Return JSON file if success
    res.status(200).json(jsonFormat);
  } catch (err) {
    // Return error on anything that got caught between the try block
    res
      .status(500)
      .json({ error: "Could not import Google Sheet " + spreadsheetId, err });
  }
};
