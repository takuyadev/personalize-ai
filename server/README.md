# Emai Backend

## Techstack
- Node.js
- Express.js
- Prisma
- Passport.js
- JWT

## Setup server
> Please setup your local PostgreSQL prior to proceeding with setting up your server

1.  Install dependencies using```npm install``` 
2.  Copy env.example and rename to .env
3.  Inside your new .env file, setup your DATABASE_URL with your own PostgreSQL credentials
4.  Migrate database using ```npx prisma migrate dev```
5.  Seed your database using ```npx prisma db seed```
6.  Start your server ```npm run start```

## Google API Key
Currently endpoints that require the Google API key can only be accessed on the Frontend by making POST requests. I plan to incorporate Postman Google authentication into Postman, but it will require extra time on my end.

## Endpoints
> WIP, please update backend developer if there are any missing endpoints

If you are using endpoints that require req.body, please refer to **/prisma/schema.prisma**. It will hold all of the created tables in the database, and you can use it to reference what is required in the body.

### Campaigns
> Requires authentication

#### GET

- ```/campaigns```: Gets all campaigns from logged in user
- ```/campaigns/:campaignId``` : Gets single campaign from logged in user

#### POST

- ```/campaigns```: Creates one campaign, associated to logged in user
   - Requires { name } (req.body)

#### PUT
- ```/campaigns/:campaignId```: Updates one campaign, associated to logged in user
  - Requires updated value in request (req.body)
- ```/campaings/update/google/:campaignId```: Updates Google Sheet ID associated to campaign

#### DELETE
- ```/campaigns/:campaignId``` : Deletes single campaign from logged in user

--- 

### Leads
> Requires authentication, with some requiring Google API key (will be marked with *)

#### GET
- ```/campaigns/:campaignId/leads```: Gets all leads from selected campaignId 
- ```/campaigns/:campaignId/leads/:leadId```: Gets single lead associated to campaign 
- ```/campaigns/search/google```: (\*) Gets all spreadsheets from user's Google Drive 
- ```/campaigns/export/:campaignId```: Export and download leads from selected Campaign as CSV 

#### POST
- ```/campaigns/:campaignId/leads```: Create single lead in associate campaign
  - *Requires { first_name, last_name, email, linkedin_url, website_url, keywords } (req.body)*
- ```/campaigns/export/google/:campaignId```: (\*) Export database leads to Google Sheet associated to campaign
- ```/campaigns/import/:campaignId```: Import uploaded CSV leads to database, associated to campaign
  - *Requires uploaded file (name=campaign) value in request (req.body.files)*
- ```/campaigns/import/google/:campaignId```: (\*) Import Google Sheet leads to database, associated to campaign
  - *Requires Google Sheet ID (googlesheet_id) value in request (req.body)*

#### PUT 
- ```/campaigns/:campaignId/leads/:leadId```: Update single lead with new values
  - *Requires updated value in request (req.body)*

#### DELETE
- ```/campaigns/:campaignId/leads/:leadId```: Deletes single lead associated to campaign 

---

### Auth

#### GET 

- ```/auth/login/google```: Login to server using Google Authentication
- ```/auth/google-api```: Get access token of user's Google API 

#### POST

- ```/auth/login```: Login user to server using credentials
  - *Requires { email, password } (req.body)*
- ```/auth/signup```: Signup user to server using credentials 
  - *Requires {first_name, last_name, email, password} (req.body)*
- ```/auth/logout```: Logout user (clear cookies)


