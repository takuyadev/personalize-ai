import { Configuration, OpenAIApi } from "openai";
import { prisma } from "#prisma/db";
import dotenv from "dotenv";
import path from "path";

// Read .env file
dotenv.config({ path: path.resolve(".env") });

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

// @desc Generates personalized first lines for all of the leads in a campaign
// @route /ai
// @method PUT

export const generateAll = async (req, res, next) => {
  const campaignId = req.params.campaignId;

  // Gets all leads from a campaign
  try {
    const leads = await prisma.lead.findMany({
      where: {
        campaign_id: campaignId,
      },
    });

    // Maps each of the lead returned from Prisma and passes in the keyword key from the leads object
    leads.map(async (lead) => {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Compliment them on their work on or at ${lead.keywords} and strictly mention it in strictly 15 words and make it natural, professional, and not overly praising, like you're speaking to a friend and strictly don't include the word "I" or "You"`,
        temperature: 1,
        max_tokens: 100,
      });

      // Updates the "personalization" column of all leads in the campaign to contain the output from the AI"
      await prisma.lead.update({
        where: {
          id: lead.id,
        },
        data: { personalization: completion.data.choices[0].text },
      });
    });
    res.status(200).json(leads);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Could not personalize for this campaign", err });
  }
};

// @desc Generates a personalized first line for a single lead in a campaign
// @route /ai/:campaignId/:leadId
// @method PUT

export const generateOne = async (req, res, next) => {
  const leadId = Number(req.params.leadId);

  try {
    // Gets single lead from selected campaign
    const lead = await prisma.lead.findFirst({
      where: {
        id: leadId,
      },
    });
    // Function that uses OpenAI to pass in a prompt from the value of the lead
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Compliment them on their work on or at ${lead.keywords} and strictly mention it in strictly 15 words and make it natural, professional, and not overly praising, like you're speaking to a friend and strictly don't include the word "I" or "You"`,
      temperature: 1,
      max_tokens: 100,
    });

    // Updates the "personalization" column of a single lead to contain the output from the AI"
    const updatedLead = await prisma.lead.update({
      where: {
        id: leadId,
      },
      data: { personalization: completion.data.choices[0].text },
    });
    res.status(200).json(updatedLead);
  } catch (err) {
    res.status(500).json({ error: "Could not personalize this lead", err });
  }
};
