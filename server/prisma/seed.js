import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import Cryptr from "cryptr";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";

const prisma = new PrismaClient();
const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);

async function main() {
  // Delete all previous data off of table
  await prisma.lead.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.user.deleteMany();

  // Seed tables with fresh data
  console.log("✨ Configuring test user...");

  // Hash and encrypt password
  const salt = bcrypt.genSaltSync(10);

  await prisma.user.create({
    data: {
      id: "69f817e8-0acd-4ea8-90ab-48eac93c12bf",
      first_name: "John",
      last_name: "Doe",
      email: "test@test.com",
      password: bcrypt.hashSync("123", salt),
      google_id: null,
      instantly_id: cryptr.encrypt(process.env.TEST_INSTANTLY_KEY),
    },
  });

  await prisma.campaign.create({
    data: {
      id: "5cc2ae62-c24c-4c18-8976-227bc9532c8e",
      user_id: "69f817e8-0acd-4ea8-90ab-48eac93c12bf",
      name: "Big Campaign",
      is_live: false,
    },
  });

  await prisma.campaign.createMany({
    data: [
      {
        user_id: "69f817e8-0acd-4ea8-90ab-48eac93c12bf",
        name: "Small Campaign",
        is_live: true,
      },
      {
        user_id: "69f817e8-0acd-4ea8-90ab-48eac93c12bf",
        name: "Small Campaign",
        is_live: true,
      },
    ],
  });

  await prisma.lead.createMany({
    data: [
      {
        personalization: "Great awesome personalized lead message!",
        first_name: "Johnathon",
        last_name: "Jello",
        email: "tester@test.com",
        campaign_id: "5cc2ae62-c24c-4c18-8976-227bc9532c8e",
        linkedin_url: "https://www.linkedin.com/in/takuya-toyokawa/",
        website_url: "www.example.com",
      },
      {
        first_name: "Ram",
        last_name: "Icarus",
        email: "ram@test.com",
        campaign_id: "5cc2ae62-c24c-4c18-8976-227bc9532c8e",
        linkedin_url: "https://www.linkedin.com/in/ramiclaguitan/",
        website_url: "www.example.com",
      },
      {
        first_name: "Mon",
        last_name: "Icarus",
        email: "ram@test.com",
        campaign_id: "5cc2ae62-c24c-4c18-8976-227bc9532c8e",
        linkedin_url: "https://www.linkedin.com/in/monika-wolfe-948897126/",
        website_url: "www.example.com",
      },
    ],
  });

  // You can set up your own Google profile if you want using your own Google ID
  console.log("✨ Setting up Google login...");
  await prisma.user.create({
    data: {
      id: "7095034b-f4e2-4d2b-aeeb-c5e08bd179ff",
      first_name: "Takuya",
      last_name: "Toyokawa",
      email: "takuya.k.toyokawa@gmail.com",
      password: bcrypt.hashSync("123", salt),
      google_id: "108941732991379441748",
    },
  });

  const campaigns = [];
  for (let i = 0; i < 40; i++) {
    campaigns.push({
      user_id: "7095034b-f4e2-4d2b-aeeb-c5e08bd179ff",
      googlesheet_id: null,
      name: uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        length: 2,
      }),
    });
  }

  await prisma.campaign.createMany({
    data: [
      {
        id: "0c2fc762-30d8-41a4-b24c-67e2bc36b76c",
        user_id: "7095034b-f4e2-4d2b-aeeb-c5e08bd179ff",
        googlesheet_id: "1LCvrYuh_c8KqOHlPuYcCVtJLzGgIevur8VKGg8pFLeQ",
        is_live: true,
        total_leads: 3,
        name: "Big Campaign",
      },
      ...campaigns,
    ],
  });

  await prisma.lead.createMany({
    data: [
      {
        personalization: "Great awesome personalized lead message!",
        first_name: "Johnathon",
        last_name: "Jello",
        email: "tester@test.com",
        campaign_id: "0c2fc762-30d8-41a4-b24c-67e2bc36b76c",
        linkedin_url: "https://www.linkedin.com/in/takuya-toyokawa/",
        website_url: "www.example.com",
      },
      {
        first_name: "Ram",
        last_name: "Icarus",
        email: "ram@test.com",
        campaign_id: "0c2fc762-30d8-41a4-b24c-67e2bc36b76c",
        linkedin_url: "https://www.linkedin.com/in/ramiclaguitan/",
        website_url: "www.example.com",
      },
      {
        first_name: "Mon",
        last_name: "Icarus",
        email: "ram@test.com",
        campaign_id: "0c2fc762-30d8-41a4-b24c-67e2bc36b76c",
        linkedin_url: "https://www.linkedin.com/in/monika-wolfe-948897126/",
        website_url: "www.example.com",
      },
    ],
  });

  // Setting up mass data
  console.log("✨ Setting logins for other users...");
  await prisma.user.createMany({
    data: [
      {
        first_name: "Jaen",
        last_name: "Doe",
        email: "test2@test.com",
        password: bcrypt.hashSync("123", salt),
        google_id: null,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
