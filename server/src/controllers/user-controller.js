import { prisma } from "#prisma/db";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);

// @desc Get authenticated user
// @route /user
// @method GET

export const getUser = async (req, res, _next) => {
  const { user_id } = req.user;

  // Gets all campaigns from user
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    // Check if user has instantly id encrypted
    let instantlyId = user.instantly_id;

    // If they do, unhash and send to user
    if (user.instantly_id) {
      instantlyId = cryptr.decrypt(user.instantly_id);
    }

    // Update user status
    res.status(200).json({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      instantly_id: instantlyId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc Updates authenticated user
// @route /user
// @method PUT

export const updateUser = async (req, res, _next) => {
  const { user_id } = req.user;
  let { instantly_id } = req.body;
  // Gets all campaigns from user
  try {
    // Pass all req.body to user
    const user = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: req.body,
    });

    // Update user status
    res.status(200).json({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc Gets the analytics of the user
// @route /user
// @method PUT

export const getUserAnalytics = async (req, res, next) => {
  try {
    // Gets total of all campaigns by user
    const campaignCount = await prisma.campaign.count({
      where: {
        user_id: req.user.user_id,
      },
    });

    // Gets how many campaigs is live and published
    const isLiveCount = await prisma.campaign.count({
      where: {
        user_id: req.user.user_id,
        is_live: true,
      },
    });

    // Gets how many campaigs is not live
    const isNotLiveCount = await prisma.campaign.count({
      where: {
        user_id: req.user.user_id,
        is_live: false,
      },
    });

    // Gets count of leads that are good to go
    const goodCount = await prisma.$queryRaw`
      SELECT COUNT(lead.id) FROM "Lead" as lead
      INNER JOIN "Campaign" ON ("Campaign".id = lead.campaign_id)
      WHERE "Campaign".user_id = ${req.user.user_id}
        AND (lead.keywords IS NOT NULL AND lead.keywords != '') 
        AND (lead.personalization IS NOT NULL AND lead.personalization != '' )
  `;

    // Gets count of leads that require review
    const requireReviewCount = await prisma.$queryRaw`
        SELECT COUNT(lead.id) FROM "Lead" as lead 
        INNER JOIN "Campaign" ON ("Campaign".id = lead.campaign_id)
        WHERE "Campaign".user_id = ${req.user.user_id}
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
      ) as subquery
    `;

    res.status(200).json({
      campaign_count: {
        all: campaignCount,
        is_live: isLiveCount,
        is_not_live: isNotLiveCount,
      },
      lead_count: {
        all: leadCount[0].sum ? Number(leadCount[0].sum) : 0,
        good: Number(goodCount[0].count),
        should_review: Number(needReviewCount[0].count),
        require_review: Number(requireReviewCount[0].count),
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
