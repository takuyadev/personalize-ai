import { google } from "googleapis";
import jwt from "jsonwebtoken";

// @desc Passes authentication for Google API to next middleware
// ! WARNING Make sure to have verifyGoogleApiCookies middleware in front!
export const setGoogleApiCredentials = (req, _res, next) => {
  // Connect to google authentication

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET_KEY,
    process.env.GOOGLE_CALLBACK_URL,
  );

  // Destructure Google API token from Google API, passed from middleware
  const { access_token, refresh_token } = req.google_api;

  // Use credentials
  auth.setCredentials({
    access_token,
    refresh_token,
  });

  // Pass to next middleware
  req.auth = auth;
  next();
};

// @desc Extra middleware for subsequent requests to Google API protected routes
// ! Only use if user has authenticated once before, and has a cookie!
export const verifyGoogleApiCookies = async (req, res, next) => {
  let decoded = null;

  // Get google api from cookies
  if (req.cookies.google_api) {
    // Decode token using key
    decoded = await jwt.verify(
      req.cookies.google_api,
      process.env.JWT_KEY || "not found",
    );
  }

  // Get google api from bearer header
  if (req.headers.authorization) {
    // Decode token using key
    decoded = {
      access_token: req.headers.authorization.split(" ")[1],
    };
  }

  // Return to authentication screen if user has no Google API token
  if (!decoded) {
    return res.status(500).json({ error: "Please authorize Google API" });
  }

  // Pass Google API key to next middleware
  req.google_api = decoded;
  next();
};
