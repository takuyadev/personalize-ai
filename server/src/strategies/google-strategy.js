import { Strategy } from "passport-google-oauth2";
import { prisma } from "#prisma/db";

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID || "not found",
  clientSecret: process.env.GOOGLE_SECRET_KEY || "not found",
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "not found",
  scope: ["profile", "email"],
};

// @desc Handles Google OAuth, as well as signing up user to our server using information from Google

export const GoogleStrategy = new Strategy(
  options,
  async (_accessToken, _refreshToken, profile, done) => {
    let isCreated = false;

    // If user was not found, then pass error to next middleware
    if (!profile) {
      done(new Error("Could not find profile from Google"), undefined);
    }

    // If profile has returned by Google, set profile to Google.
    const { given_name, family_name, email, id } = profile;

    // Check user if it exists in database
    let user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    // If user with associated email was not found, create new user
    if (user && !user?.google_id) {
      user = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          google_id: id,
        },
      });
    }

    // If user with associated email was not found, create new user
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          google_id: id,
          first_name: given_name,
          last_name: family_name,

          // Change this later so password is random generated
          password: "123",
        },
      });
      isCreated = true;
    }

    // Once all checks and user is authenticated to our server, pass data to next middleware
    done(null, { user_id: user.id });
  },
);
