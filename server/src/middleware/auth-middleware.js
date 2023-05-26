import passport from "passport";

// @desc Verifies if user is logged in to the website
export const authJwt = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    // If error has happened, return error
    if (err) {
      return res.status(500).json({ error: err });
    }

    // If payload was not found, then return error
    if (!user) {
      return res
        .status(500)
        .json({ error: "No valid token was found, please login." });
    }

    // Send payload to next middleware
    req.user = user;
    next();
  })(req, res, next);
};

// @desc Verifies if user is has authentication to Google API
export const authGoogleApiJwt = (req, res, next) => {
  passport.authenticate("google-api", { session: false }, (err, googleApi) => {
    // If error has happened, return error
    if (err) {
      return res.status(500).json({ error: err });
    }

    // If payload was not found, then return error
    if (!googleApi) {
      return res
        .status(500)
        .json({
          error: "No valid API token was found, please authorize again.",
        });
    }

    // Send payload to next middleware
    req.googleApi = googleApi;
    next();
  })(req, res, next);
};
