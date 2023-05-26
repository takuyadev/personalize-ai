# 🤖 Personalize.ai
> AI-driven mass email personalization tool

Personalize.ai is an efficient software for tailoring mass cold emails. It leverages AI and user-inputted keywords to customize an opening line of your emails. Whether you prefer CSV files or Google Sheets, our platform integrates with Instantly to simplify your campaign's email uploads. Make it your streamlined solution for personalizing mass email campaigns, enhancing audience engagement, and improving marketing outcomes.

### 📧 AI-Powered Email Personalization
Create a multitude of unique email introductions using AI. Our algorithm ensures quality by identifying emails that may need your review.

### 📥 Google Sheets and Instantly Compatibility
Work seamlessly between Google Sheets and our platform, transferring your work to Instantly when finished.

### 🏘️ Quick Data Analysis
Monitor your campaign with our data analysis tool. Check campaign status, completion rate, and overall performance at a glance.

## Demo
https://github.com/takuyadev/personalize-ai/assets/55810680/af8d7d7d-52cf-45f7-8a54-28f8fd35d495

## Techstack

### Frontend
- Next.js v13.4
- CSS Modules
- SASS
- Lottie
- Framer Motion
- Chart.js
- React OAuth Google Login
- Atomic Design Structure

### Backend
- Node.js
- Express.js
- Prisma
- Passport.js
- bcryptjs
- jsonwebtoken
- Cryptr
- Express File Upload
- OpenAI
- csvtojson

## Environment 
We recommend using these versions of packages for stable development:

1. Node.js (v18.15.0)
2. npm (v9.5.0)
3. PostgreSQL (v14.3)

## Setup client

1. Install dependencies using ```npm install ```
2. Copy env.example and rename to .env
3. Inside your new .env file, setup your Google Credentials and Server URL
4. Start the server using ```npm run dev```

## Setup server
> Please setup your local PostgreSQL prior to proceeding with setting up your server

1.  Install dependencies using```npm install``` 
2.  Copy env.example and rename to .env
3.  Inside your new .env file, setup your DATABASE_URL with your own PostgreSQL credentials
4.  Fill out the rest of your .env files (ENCRYPTION_KEY, JWT_KEY... etc)
5.  Migrate database using ```npx prisma migrate dev```
6.  Seed your database using ```npx prisma db seed```
7.  Start your server ```npm run start```
