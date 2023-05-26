import { prisma } from "#prisma/db";
import bcrypt from "bcryptjs";
import passport from "passport";
import jwt from "jsonwebtoken";
import { google } from "googleapis";
import { setCookieOptions } from "#utils/setCookieOptions";

// @desc Handles login, and sends token
// @route /auth/login
// @method POST

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // If user provided no email
  if (!email) {
    return res.status(500).json({ error: "Please provide password" });
  }

  // If user provided no password
  if (!password) {
    return res.status(500).json({ error: "Please provide password" });
  }

  // Check if user exists
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  // If user was not found using email
  if (!user) {
    return res.status(500).json({ error: "No user found with email" });
  }

  // Check password
  const hash = bcrypt.compareSync(password, user.password);

  // If hash returns false, then return error
  if (!hash) {
    return res.status(500).json({ error: "Password does not match" });
  }

  // Sign token to send through cookies
  const token = jwt.sign({ user_id: user.id }, process.env.JWT_KEY || "");

  const cookieOptions = setCookieOptions(process.env.NODE_ENV);
  res.cookie("token", token, cookieOptions).status(200).json({ email, token });
};

// @desc Registers user, and sends token
// @route /auth/signup
// @method POST

export const signup = async (req, res, next) => {
  const { email, password, first_name, last_name } = req.body;

  // If user provided no email
  if (!email) {
    return res.status(500).json({ error: "Please provide password" });
  }

  // If user provided no password
  if (!password) {
    return res.status(500).json({ error: "Please provide password" });
  }

  // If user provided no password
  if (!first_name || !last_name) {
    return res.status(500).json({ error: "Please provide your name" });
  }

  // Check if user is already registered
  const checkUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  // If user is registered, then return error
  if (checkUser) {
    return res.status(500).json({ error: "User already exists" });
  }

  // Check hashed password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  // Create user
  const createUser = await prisma.user.create({
    data: {
      email,
      first_name,
      last_name,
      password: hash,
    },
  });

  // Sign token to send through cookies
  const token = jwt.sign({ user_id: createUser.id }, process.env.JWT_KEY || "");

  const cookieOptions = setCookieOptions(process.env.NODE_ENV);
  res.cookie("token", token, cookieOptions).status(200).json({ email, token });
};

// @desc Verifies Google auth and signs JWT token to send to client
// @route /auth/login/google
// @method POST

export const signGoogleAuth = async (req, res, next) => {
  try {
    // Setup User OAuth
    const oauth2 = google.oauth2({
      auth: req.auth,
      version: "v2",
    });

    // Grab profile using access token
    const profile = await oauth2.userinfo.get();
    const { given_name, family_name, email, id } = profile.data;

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
    }
    // Sign token to send through cookies
    const token = jwt.sign({ user_id: user.id }, process.env.JWT_KEY || "");

    // Send cookie to user
    const cookieOptions = setCookieOptions(process.env.NODE_ENV);
    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({ email, token });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Could not authenticate user using Google" });
  }
};

// ! OLD AUTH STRATS
// @desc Verifies Google auth and signs JWT token to send to client
// @route /auth/login/google
// @method GET

export const signGoogleAuthDeprecated = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, profile) => {
    // If any error was passed from strategy, return error
    if (err) {
      return res.status(500).json(profile);
    }

    // If all passed, send json status
    const token = jwt.sign(profile, process.env.JWT_KEY || "not found");

    // Setup cookie options based on environment
    const cookieOptions = setCookieOptions(process.env.NODE_ENV);

    // Send success message for authenticating user
    res.cookie("token", token, cookieOptions).status(200).json({ token });
  })(req, res, next);
};

// @desc Verify user
// @route /auth/verify
// @method GET

export const verify = async (req, res, next) => {
  try {
    // Get user using decrypted user_id from token
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.user_id,
      },
    });

    // Send back email response if verified
    res.status(200).json({ email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Error verifying user" });
  }
};

// @desc Logout by setting the cookie to expire immediately
// @route /auth/logout
// @method POST

// ! Since JWT is stateless, this will not expire the token immediately, meaning if someone steals the token, then the user clears the cookie the token is still valid until expiration. This is a quick and dirty logout system for MVP, consider having refresh tokens, etc for better security.

export const logout = (req, res, next) => {
  // Overwrite the JWT secure httpOnly cookie with an expired one
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    })
    .cookie("google_api", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    })
    .status(200)
    .json({ message: "Logged out" });
};

// @desc Verifies Google Api auth and signs JWT token to send to client
// @route /auth/google-api
// @method GET

export const signGoogleApiAuth = (req, res, next) => {
  passport.authenticate("google-api", { session: false }, (err, profile) => {
    // If any error was passed from strategy, return error
    if (err) {
      return res.status(500).json(profile);
    }

    // If all passed, send json status
    const token = jwt.sign(profile, process.env.JWT_KEY || "not found");

    // Setup cookie options based on environment
    const cookieOptions = setCookieOptions(process.env.NODE_ENV);

    // Send success message for authenticating user
    res.cookie("google_api", token, cookieOptions).status(200).json({ token });
  })(req, res, next);
};
