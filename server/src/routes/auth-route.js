import express from "express";
import passport from "passport";

// Import routes from controllers
import {
  login,
  signup,
  verify,
  logout,
  signGoogleApiAuth,
  signGoogleAuth,
  signGoogleAuthDeprecated,
} from "#controllers/auth-controller";
import { authJwt } from "#middleware/auth-middleware";
import {
  verifyGoogleApiCookies,
  setGoogleApiCredentials,
} from "#middleware/google-api-middleware";
const router = express.Router();

// @desc Handles authentication of user
// @route /auth

// Standard login routes
router.post("/", (_req, res, _next) => res.redirect("/auth/login"));
router.get("/verify", authJwt, verify);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.post(
  "/login/google",
  verifyGoogleApiCookies,
  setGoogleApiCredentials,
  signGoogleAuth,
);

// Google authentication routes
router.get(
  "/login/google",
  passport.authenticate("google", { session: false }),
);
router.get("/login/google/redirect", signGoogleAuthDeprecated);

// Google API authentication routes
router.get(
  "/google-api",
  passport.authenticate("google-api", { session: false }),
);
router.get("/google-api/redirect", signGoogleApiAuth);

// Default export of router
export default router;
