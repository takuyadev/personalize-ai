import express from "express";

const router = express.Router();

import {
  listCampaigns,
  addLeadstoCampaign,
  updateInstantlyId,
  getAnalytics,
} from "#controllers/email-controller";
import { authJwt } from "#middleware/auth-middleware";
import { checkInstantlyApiKey } from "#middleware/email-middleware";

router.get("/", authJwt, checkInstantlyApiKey, listCampaigns);
router.post(
  "/:campaignId",
  authJwt,
  checkInstantlyApiKey,
  addLeadstoCampaign,
);
router.put(
  "/:campaignId/:instantlyId",
  authJwt,
  checkInstantlyApiKey,
  updateInstantlyId,
);
router.get("/:instantlyId", authJwt, checkInstantlyApiKey, getAnalytics);

export default router;
