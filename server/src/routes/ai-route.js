import express from "express";
const router = express.Router();

import {
  generateAll,
  generateOne
} from "#controllers/ai-controller";

// Middlewares for authentication
import { authJwt } from "#middleware/auth-middleware";
import { verifyCampaign } from "#middleware/lead-middleware";

router.put(
  "/:campaignId",
  authJwt,
  verifyCampaign,
  generateAll
  );
router.put(
  "/:campaignId/:leadId",
  authJwt,
  verifyCampaign,
  generateOne,
  );

export default router

