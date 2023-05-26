export const handleCampaignQuery = (req, res, next) => {
  if (!req.query.limit) {
    req.query.take = 20;
  }

  if (req.query.skip) {
    req.query.skip = Number(req.query.skip);
  }

  if (!req.query.skip) {
    req.query.skip = 0;
  }

  if (!req.query.created_at) {
    req.query.created_at = "desc";
  }

  next();
};
