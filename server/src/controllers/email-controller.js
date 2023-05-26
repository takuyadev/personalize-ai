import { prisma } from "#prisma/db";
import { XMLHttpRequest } from "xmlhttprequest";
import Cryptr from "cryptr";

// @desc Gets all of the campaigns on Instantly through the API key
// @route /email
// @method GET

export const listCampaigns = async (req, res, next) => {
  try {
    const data = JSON.stringify(false);
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        res.status(200).json(JSON.parse(this.responseText));
      }
    });

    xhr.open(
      "GET",
      `https://api.instantly.ai/api/v1/campaign/list?api_key=${req.instantly_api_key}`,
    );

    xhr.send(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Could not get list of campaigns from Instantly" });
  }
};

// @desc Posts/Adds all of the leads from the database with the Instantly ID that matches the Instantly campaign
// @route /email/:campaignId
// @method POST

export const addLeadstoCampaign = async (req, res, next) => {
  try {
    const campaignId = req.params.campaignId;

    // Gets all campaigns from user
    const campaign = await prisma.campaign.findFirst({
      where: {
        id: campaignId,
      },
      include: {
        leads: true,
      },
    });

    const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);

    // Decrypt from database or use the one provided by params
    let instantlyId = cryptr.decrypt(campaign.instantly_id);

    // Check param URL instead of decrypt didnt return anything
    if (!instantlyId) {
      instantlyId = req.params.instantlyId;
    }

    console.log(req.instantly_api_key)
    console.log(instantlyId)
    console.log(campaign)
    

    await fetch("https://api.instantly.ai/api/v1/lead/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: req.instantly_api_key,
        campaign_id: `${instantlyId}`,
        skip_if_in_workspace: false,
        leads: campaign.leads.map((lead) => {
          return {
            email: lead.email,
            first_name: lead.first_name,
            last_name: lead.last_name,
            company_name: lead.company_name,
            personalization: lead.personalization,
            website: lead.website_url,
            custom_variables: {
              city: lead.city,
              linkedin: lead.linkedin_url,
            },
          };
        }),
      }),
    });

    // Gets all campaigns from user
    await prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        is_live: true,
      },
    });

    // Update campaign to be live
    res.status(200).json({ message: "Successfully imported to Instantly!" });
  } catch (err) {
    res.status(500).json({ error: "Could not add leads to Instantly" });
  }
};

// @desc Updates the all of the lead's "instantly_id" value in a campaign to the dynamic params given
// @route /email/:campaignId/:instantlyId
// @method PUT

export const updateInstantlyId = async (req, res, next) => {
  const campaignId = req.params.campaignId;
  const instantlyId = req.params.instantlyId;

  try {
    const campaign = await prisma.campaign.findFirst({
      where: {
        id: campaignId,
      },
    });

    await prisma.campaign.update({
      where: {
        id: campaign.id,
      },
      data: { instantly_id: instantlyId },
    });

    res.status(200).json({ id: campaign.id, name: campaign.name });
  } catch (err) {
    res.status(500).json({ error: "Could not update Instantly ID" });
  }
};

// @desc Gets a campaign's analytics summary
// @route /email/:instantlyId
// @method GET

export const getAnalytics = async (req, res, next) => {
  const instantlyId = req.params.instantlyId;

  try {
    fetch(
      `https://api.instantly.ai/api/v1/analytics/campaign/summary?api_key=${req.instantly_api_key}&campaign_id=${instantlyId}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        res.status(200).json(data);
      });
  } catch (err) {
    res.status(500).json({ error: "Could not get analytics from Instantly" });
  }
};
