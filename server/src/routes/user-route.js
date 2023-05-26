import express from "express";
import { getUser, updateUser, getUserAnalytics  } from "#controllers/user-controller";
import { authJwt } from "#middleware/auth-middleware";
import { checkRequestBody } from "#middleware/body-middleware";

const router = express.Router();

// Middlewares for authentication

router.get("/", authJwt, getUser);
router.put("/", authJwt, checkRequestBody, updateUser);
router.get("/analytics", authJwt, getUserAnalytics)

export default router;
