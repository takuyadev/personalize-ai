import { prisma } from "#prisma/db";

export const verifyCampaign = async (req, res, next) => {
  const { user_id } = req.user;
  const campaignId = req.params.campaignId;

  // Gets all campaigns from user
  const campaign = await prisma.campaign.findFirst({
    where: {
      user_id,
      id: campaignId,
    },
  });

  // If campaign user id does not match with token user_id
  if (!campaign || campaign.length === 0) {
    return res.status(500).json({ error: "No campaign found" });
  }

  // If campaign user id does not match with token user_id
  if (campaign.user_id !== user_id) {
    return res.status(500).json({ error: "User not authorized to view leads" });
  }
  
  next()
};
