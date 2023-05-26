import Cryptr from "cryptr";
import { prisma } from "#prisma/db";

export const checkInstantlyApiKey = async (req, res, next) => {
  try {
    // Find user from database to retrieve instantly API key
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.user_id,
      },
    });

    // IF user was not found
    if (!user) {
      return res
        .status(500)
        .json({ error: "Could not get list of campaigns from Instantly" });
    }

    // If user had no instantly ID associated
    if (!user.instantly_id) {
      return res
        .status(500)
        .json({ error: "User doesn't have an associated Instantly API key" });
    }

    const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
    // Set and pass APi key to next middleware
    req.instantly_api_key = cryptr.decrypt(user.instantly_id);
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Error verifying user's Instantly API key",
    });
  }
};
