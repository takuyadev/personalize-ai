import { Strategy } from "passport-google-oauth2";

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID || "not found",
  clientSecret: process.env.GOOGLE_SECRET_KEY || "not found",
  callbackURL: process.env.GOOGLE_API_CALLBACK_URL || "not found",
  scope: [
    "email",
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
};

// @desc Handles Google API OAuth, and allows permission for Google API to be used for authenticated user

export const GoogleApiStrategy = new Strategy(
  options,
  (accessToken, refreshToken, profile, done) => {
    // If user was not found, then pass error to next middleware
    if (!profile) {
      done(new Error("Could not find profile from Google"), undefined);
    }

    // Once all checks and user is authenticated to our server, pass data to next middleware
    done(null, { access_token: accessToken, refresh_token: refreshToken });
  },
);
