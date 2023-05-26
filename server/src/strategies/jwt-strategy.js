import { Strategy } from "passport-jwt";
import dotenv from "dotenv";
import path from "path";

// Read .env file
dotenv.config({ path: path.resolve(".env") });

// Read secure cookie sent from request
const readCookieFromJwt = (req) => {
  let token = null;

  // If cookie exists, then set token to passed jwt token
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Return token, null or not
  return token;
};

// Set options for JwtStrategy
const options = {
  secretOrKey: process.env.JWT_KEY,
  // Custom JWT extractor
  jwtFromRequest: readCookieFromJwt,
};

export const JwtStrategy = new Strategy(options, (payload, done) => {
  // If readCookieFormJwt returns error, then pass error down
  if (!payload) {
    done(new Error("Invalid token from cookie"), undefined);
  }

  // Else, then pass payload to next
  done(null, payload);
});
