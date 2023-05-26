import { prisma } from "#prisma/db";
import Cryptr from "cryptr";
// @desc Gets all user campaigns, using token user_id
// @route /campaigns
// @method GET

export const getUserCampaigns = async (req, res, _next) => {
  const { user_id } = req.user;
  const { take, skip, name, created_at } = req.query;

  // Gets all campaigns from user
  try {
    const campaigns = await prisma.campaign.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
        user_id,
      },
      include: {
        _count: {
          select: { leads: true },
        },
      },
      orderBy: {
        created_at: created_at,
      },
      skip: skip === 0 ? 0 : skip * Number(take),
      take,
    });

    // SUCCESS: returns data
    // ERROR: no return data, only throws error
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc Gets one user campaign, using token user_id + campaignId
// @route /campaigns/:campaignId
// @method GET

export const getUserCampaign = async (req, res, _next) => {
  const { user_id } = req.user;
  const campaignId = req.params.campaignId;

  // Gets all campaigns from user
  const campaign = await prisma.campaign.findFirst({
    where: {
      user_id,
      id: campaignId,
    },
    include: {
      leads: true,
    },
  });
  
  // If campaigns is empty, return error
  if (!campaign || campaign.length === 0) {
    return res.status(500).json({ error: "No campaign found" });
  }
  
  // If they do, unhash and send to user
  if (campaign.instantly_id) {
    const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
    campaign.instantly_id = cryptr.decrypt(campaign.instantly_id);
  }

  // Send all campaigns
  res.status(200).json(campaign);
};

// @desc Creates one user campaign, using token user_id + campaignId
// @route /campaigns
// @method POST

export const createUserCampaign = async (req, res, _next) => {
  const { user_id } = req.user;

  try {
    // Gets all campaigns from user
    const campaign = await prisma.campaign.create({
      data: {
        user_id,
        name: req.body.name,
      },
    });

    // If they do, unhash and send to user
    if (campaign.instantly_id) {
      const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
      campaign.instantly_id = cryptr.decrypt(campaign.instantly_id);
    }

    // Send all campaigns on success
    res.status(200).json(campaign);
  } catch (err) {
    // Return error if error occured while updating
    return res.status(500).json({ error: "Could not create campaign" });
  }
};

// @desc Updates one user campaign, using token user_id + campaignId
// @route /campaigns/:campaignId
// @method PUT

export const updateUserCampaign = async (req, res, _next) => {
  const campaignId = req.params.campaignId;

  try {
    // Gets all campaigns from user
    const campaign = await prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: req.body,
    });

    // If they do, unhash and send to user
    if (campaign.instantly_id) {
      const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
      campaign.instantly_id = cryptr.decrypt(campaign.instantly_id);
    }

    // Send all campaigns on success
    res.status(200).json(campaign);
  } catch (err) {
    // Return error if error occured while updating
    return res.status(500).json({ error: "Could not update " + campaignId });
  }
};

// @desc Deletes one user campaign, using token user_id + campaignId
// @route /campaigns/:campaignId
// @method DELETE

export const deleteUserCampaign = async (req, res, _next) => {
  const campaignId = req.params.campaignId;

  try {
    // Gets all campaigns from user
    const campaign = await prisma.campaign.delete({
      where: {
        id: campaignId,
      },
    });

    // Send all campaigns on success
    res.status(200).json(campaign);
  } catch (err) {
    // Return error if error occured while updating
    return res.status(500).json({ error: "Could not delete " + campaignId });
  }
};

// @desc Gets all analytics of leads in single campaign
// @route /campaigns/:campaignId/analytics
// @method GET

export const getCampaignAnalytics = async (req, res, _next) => {
  const campaignId = req.params.campaignId;

  try {
    // Gets count of leads that are good to go
    const goodCount = await prisma.$queryRaw`
      SELECT COUNT(lead.id) FROM "Lead" as lead
      INNER JOIN "Campaign" ON ("Campaign".id = lead.campaign_id)
      WHERE "Campaign".user_id = ${req.user.user_id}
      AND "Campaign".id = ${campaignId}
        AND (lead.keywords IS NOT NULL AND lead.keywords != '') 
        AND (lead.personalization IS NOT NULL AND lead.personalization != '' )
  `;


    // Gets count of leads that require review
    const requireReviewCount = await prisma.$queryRaw`
        SELECT COUNT(lead.id) FROM "Lead" as lead 
        INNER JOIN "Campaign" ON ("Campaign".id = lead.campaign_id)
        WHERE "Campaign".user_id = ${req.user.user_id}
        AND "Campaign".id = ${campaignId}
        AND NOT (
          (lead.personalization IS NOT NULL AND lead.personalization != '' AND lead.keywords IS NOT NULL AND lead.keywords != '')
          OR 
          (
            ((lead.keywords IS NULL OR lead.keywords = '') AND ((lead.website_url IS NOT NULL AND lead.website_url != '') OR (lead.linkedin_url IS NOT NULL AND lead.linkedin_url != '')))
            OR
            ((lead.personalization IS NULL OR lead.personalization = '') AND ((lead.website_url IS NOT NULL AND lead.website_url != '') OR (lead.linkedin_url IS NOT NULL AND lead.linkedin_url != '')))
          )
        )
    `;

    // Gets count of leads that should be reviewed
    const needReviewCount = await prisma.$queryRaw`
      SELECT COUNT(lead.id) FROM "Lead" as lead 
      INNER JOIN "Campaign" ON ("Campaign".id = lead.campaign_id)
      WHERE "Campaign".user_id = ${req.user.user_id}
      AND "Campaign".id = ${campaignId}
        AND (
          (
            (lead.keywords IS NULL OR lead.keywords = '') AND
            ((lead.website_url IS NOT NULL AND lead.website_url != '') OR 
              (lead.linkedin_url IS NOT NULL AND lead.linkedin_url != ''))
          )      
          OR (
            (lead.personalization IS NULL OR lead.personalization = '' ) AND
            ((lead.website_url IS NOT NULL AND lead.website_url != '') OR 
              (lead.linkedin_url IS NOT NULL AND lead.linkedin_url != ''))
          )
        ) 
    `;


    // Gets the count of all the leads
    const leadCount = await prisma.$queryRaw`
      SELECT SUM(lead_count)
      FROM (
        SELECT COUNT(leads.id) as lead_count
        FROM "Campaign" as campaigns
        LEFT JOIN "Lead" as leads ON campaigns.id = leads.campaign_id
        WHERE campaigns.user_id = ${req.user.user_id}
        AND campaigns.id = ${campaignId}
      ) as subquery
    `;


    res.status(200).json({
      lead_count: {
        all: leadCount[0].sum ? Number(leadCount[0].sum) : 0,
        good: Number(goodCount[0].count),
        should_review: Number(needReviewCount[0].count),
        require_review: Number(requireReviewCount[0].count),
      },
    });
  } catch (err) {
    // Return error if error occured while updating
    return res.status(500).json({ error: "Could not get analytics for " + campaignId });
  }
};
