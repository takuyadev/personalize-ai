import Cryptr from "cryptr";

// @desc Simple body check before doing CRUD operations
export const checkRequestBody = (req, res, next) => {
  const { id, created_at } = req.body;

  // Check if body exists or not
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(500).json({
      error: "Please provide body request",
    });
  }

  // Hash instantly ID if passed
  if (req.body.instantly_id) {
    const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
    req.body.instantly_id = cryptr.encrypt(req.body.instantly_id);
  }

  // Prevent id or created_at to be mutated
  if (id || created_at) {
    return res
      .status(500)
      .json({ error: "Unauthorized to mutate id or created_at" });
  }

  next();
};
