// @desc Set cookie options based on node environment
export const setCookieOptions = (env) => {
  // Set cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    domain: process.env.CLIENT_DOMAIN || undefined,
    sameSite: "none",
  };

  // Only in development mode, set secure as false
  if (env === "development") {
    cookieOptions.secure = false;
  }

  // Return cookie options
  return cookieOptions;
};
