import express from "express";
import passport from "passport";
import fileUpload from "express-fileupload";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenvExpand from "dotenv-expand";
import auth from "#routes/auth-route";
import campaign from "#routes/campaign-route";
import ai from "#routes/ai-route";
import email from "#routes/email-route";
import user from "#routes/user-route"
import cookieParser from "cookie-parser";
import { JwtStrategy } from "#strategies/jwt-strategy";
import { GoogleStrategy } from "#strategies/google-strategy";
import { GoogleApiStrategy } from "#strategies/google-api-strategy";

// Load environment variable
const env = dotenv.config({ path: path.resolve("./") + "/.env" });

// Allow for concatenating env variables
dotenvExpand.expand(env);

// Server configuration variables
const PORT = process.env.SERVER_PORT || 5000;
const RATE_TIME_LIMIT = process.env.RATE_TIME_LIMIT || 15;
const RATE_REQUEST_LIMIT = process.env.RATE_REQUEST_LIMIT || 100;

// Startup express server
const app = express();

// Parse into requests into JSON
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  }),
);

// Parse cookies from client
app.use(cookieParser());

// Detailed logs from server
app.use(morgan("dev"));

// Limits the amount of request the server can make, only on production
if (process.env.NODE_ENV === "production") {
  app.use(
    rateLimit({
      // How many requests they can make per alloted time
      windowMs: RATE_TIME_LIMIT * 60 * 1000,
      max: RATE_REQUEST_LIMIT,
    }),
  );
}

// Handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // replace with the domain of your client
    credentials: true,
  }),
);

// Security Headers
app.use(helmet());

// Secure against param pollutions
app.use(hpp());

// Passport middlewares
passport.use("google", GoogleStrategy);
passport.use("google-api", GoogleApiStrategy);
passport.use("jwt", JwtStrategy);

// All routes
app.use("/auth", auth);
app.use("/campaigns", campaign);
app.use("/ai", ai);
app.use("/email", email);
app.use("/user", user);

// Handle errors from database
app.use((err, _req, res, _next) => {
  res.status(500).json({ err });
});

// Listen to server
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}!`);
});
