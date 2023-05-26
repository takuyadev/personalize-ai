import express from "express";

// Controller imports
import {
  getUserCampaigns,
  getUserCampaign,
  updateUserCampaign,
  createUserCampaign,
  deleteUserCampaign,
  getCampaignAnalytics,
} from "#controllers/campaign-controller";

import {
  createUserCampaignLead,
  getUserCampaignLeads,
  getUserCampaignLead,
  updateUserCampaignLead,
  deleteUserCampaignLead,
  importLeadsCsv,
  exportLeadsToGoogle,
  exportLeadCsv,
  getGoogleSheets,
  importLeadsGoogleSheet,
  updateCampaignGoogleSheetId,
} from "#controllers/lead-controller";

// Middlewares for authentication
import { authJwt } from "#middleware/auth-middleware";
import {
  setGoogleApiCredentials,
  verifyGoogleApiCookies,
} from "#middleware/google-api-middleware";
import { verifyCampaign } from "#middleware/lead-middleware";
import { checkRequestBody } from "#middleware/body-middleware";
import { handleCampaignQuery } from "#middleware/query-middleware";

const router = express.Router();

// @desc Handle campaign routing with authentication
router.get("/", authJwt, handleCampaignQuery, getUserCampaigns);
router.post("/", authJwt, checkRequestBody, createUserCampaign);
router.get("/:campaignId", authJwt, getUserCampaign);
router.put("/:campaignId", authJwt, checkRequestBody, updateUserCampaign);
router.delete("/:campaignId", authJwt, deleteUserCampaign);

// @desc Handle campaign leads routing with authentication
router.get("/:campaignId/leads", authJwt, verifyCampaign, getUserCampaignLeads);

// @desc Gets analytics of campaign
router.get(
  "/:campaignId/analytics",
  authJwt,
  verifyCampaign,
  getCampaignAnalytics,
);

router.get(
  "/:campaignId/leads/:leadId",
  authJwt,
  verifyCampaign,
  getUserCampaignLead,
);

// Create single lead
router.post(
  "/:campaignId/leads",
  authJwt,
  verifyCampaign,
  checkRequestBody,
  createUserCampaignLead,
);

// Update single lead
router.put(
  "/:campaignId/leads/:leadId",
  authJwt,
  verifyCampaign,
  checkRequestBody,
  updateUserCampaignLead,
);

// Delete single lead
router.delete(
  "/:campaignId/leads/:leadId",
  authJwt,
  verifyCampaign,
  deleteUserCampaignLead,
);

// @desc Search google sheets in user folder with Google API authentication
router.get(
  "/search/google",
  verifyGoogleApiCookies,
  setGoogleApiCredentials,
  getGoogleSheets,
);

// @desc Update associated Google Sheet in Campaign
router.put(
  "/update/google/:campaignId",
  authJwt,
  verifyCampaign,
  checkRequestBody,
  updateCampaignGoogleSheetId,
);

// @desc Export lead file from campaign
router.get("/export/:campaignId", authJwt, verifyCampaign, exportLeadCsv);
router.post(
  "/export/google/:campaignId",
  authJwt,
  verifyGoogleApiCookies,
  setGoogleApiCredentials,
  verifyCampaign,
  exportLeadsToGoogle,
);

// @desc Handles imports to database with authentication
router.post("/import/:campaignId", authJwt, verifyCampaign, importLeadsCsv);
router.post(
  "/import/google/:campaignId",
  authJwt,
  verifyGoogleApiCookies,
  setGoogleApiCredentials,
  verifyCampaign,
  checkRequestBody,
  importLeadsGoogleSheet,
);

export default router;
