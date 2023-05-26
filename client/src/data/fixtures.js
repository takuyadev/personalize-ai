export const LEADS_DATA = [
  {
    id: 1,
    personalization: "Great awesome personalized lead message!",
    first_name: "Johnathon",
    last_name: "Jello",
    email: "tester@test.com",
    created_at: "2023-05-15T03:34:31.425Z",
    campaign_id: "5cc2ae62-c24c-4c18-8976-227bc9532c8e",
    linkedin_url: "https://www.linkedin.com/in/takuya-toyokawa/",
    website_url: "www.example.com",
    keywords: "Software Engineer",
  },
  {
    id: 2,
    personalization: null,
    first_name: "Ram",
    last_name: "Icarus",
    email: "ram@test.com",
    created_at: "2023-05-15T03:34:31.425Z",
    campaign_id: "5cc2ae62-c24c-4c18-8976-227bc9532c8e",
    linkedin_url: null,
    website_url: null,
    keywords: null,
  },
  {
    id: 3,
    personalization: "Generated using Websites!",
    first_name: "Mon",
    last_name: "Icarus",
    email: "ram@test.com",
    created_at: "2023-05-15T03:34:31.425Z",
    campaign_id: "5cc2ae62-c24c-4c18-8976-227bc9532c8e",
    linkedin_url: "https://www.linkedin.com/in/monika-wolfe-948897126/",
    website_url: "www.example.com",
    keywords: null,
  },
];

export const CAMPAIGNS_DATA = [
  {
    id: 1,
    title: "Not live very sadge",
    createdAt: new Date().toLocaleDateString(),
    isLive: false,
    total_count: 128,
    leads: LEADS_DATA,
  },
  {
    id: 2,
    title: "Live and loaded",
    createdAt: new Date().toLocaleDateString(),
    isLive: true,
    total_cosunt: 6,
    leads: LEADS_DATA,
  },
];

export const GOOGLESHEETS_DATA = [
  {
    kind: "drive#file",
    mimeType: "application/vnd.google-apps.spreadsheet",
    id: "1LCvrYuh_c8KqOHlPuYcCVtJLzGgIevur8VKGg8pFLeQ",
    name: "Leads list",
  },
  {
    kind: "drive#file",
    mimeType: "application/vnd.google-apps.spreadsheet",
    id: "1L6H5isYZN_DdvSzRqRhv0HBBvQ0eU57ziNKLsmQzEX8",
    name: "TI Student Schedule",
  },
  {
    kind: "drive#file",
    mimeType: "application/vnd.google-apps.spreadsheet",
    id: "1YtIa4Ioxhi1FlA8YqA54mSD5XDHAB-L4B5a7GsKIXKw",
    name: "Demo Day Student Groups",
  },
  {
    kind: "drive#file",
    mimeType: "application/vnd.google-apps.spreadsheet",
    id: "1X3ZsVXgcf7DBy64DXnoW0ALuOcAatgLSNbqKxf4XLQk",
    name: "[SXL] Master Contact",
  },
  {
    kind: "drive#file",
    mimeType: "application/vnd.google-apps.spreadsheet",
    id: "1_JzirvjmvUi7NtGdhOAsM0RCNqaslFGvBanKunG3zVs",
    name: "Osaka, Nanba Restaurants",
  },
  {
    kind: "drive#file",
    mimeType: "application/vnd.google-apps.spreadsheet",
    id: "1AH598AP6Q0M1LQxB4GbhaBQyqUaYS-TJWgD4E1DtWIw",
    name: "Leetcode Patterns",
  },
  {
    kind: "drive#file",
    mimeType: "application/vnd.google-apps.spreadsheet",
    id: "1BFqXCePOnC8zYQo_vaLfFbYzzzu2d92WIWbnv7aIRyw",
    name: "KuriAPI",
  },
  {
    kind: "drive#file",
    mimeType: "application/vnd.google-apps.spreadsheet",
    id: "1mo7myqHry5r_TKvakvIhHbcEAEQpSiNoNQoIS8sMpvM",
    name: "Editors' Copy - Data Spreadsheet for ACNH",
  },
  {
    kind: "drive#file",
    mimeType: "application/vnd.google-apps.spreadsheet",
    id: "1GYvA-xRfRM-al5DIhd6PO4xjvF1Qp1fHOwIucd1U8KI",
    name: "2022 Content Calendar ",
  },
];
