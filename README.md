# Tyndal

## Introduction

Tyndall, is a platform that leverages the latest and cutting edge Generative AI to provide generated articles/research materials based on user-chosen area of interest. Tyndall also directs the users to external publications for further study

The functionalities associated with the application are:

- Users Registration and Authentication
- Authentication and Registration via **Google**
- Users can choose from a wide range of areas of Interests
- Users can like articles which will serve as Telementry to help the AI in generating better contents.
- Users can share Articles generated to other applications
- ..And more

## Routes

The web application has the following routes:

1. **Registration and Login Routes:**

   - Users can register for an account and log in to the application.

2. **Onboarding Routes:**

   - These routes guide new users through the initial setup process, such as selecting their areas of interest.

3. **Feed or Article Generation Route:**

   - Users can access a feed of AI-generated articles based on their chosen areas of interest.
   - This route uses an API to call an AI model to generate the articles.

4. **Toggling Likes and Comment Routes:**
   - Users can like and comment on articles they find interesting.
   - This route likely involves storing user interactions with the articles in a database.

## Additional Considerations

- Technologies used (Nextjs, Tailwindcss, Anthropic Sonnet 3.5, SuperToken Auth, Google OAuth)
- Deployment details (Vercel)

## Getting Started

- First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
```

- Environmental Variables to start the project

```conf
#This can be gotten via google cloud console API settings for your project
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

#Github Oauth client Key
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

### Your Gemini API key. you can get this from google AI studio https://aistudio.google.com/apikey
GEMINI_API_KEY=

### Supertoken Core API Ley and Endpoint
SUPER_TOKEN_CORE=
CORE_API_KEY=

### Database connection string This one is unique to you
- To get this connect to postgresql and get your database url
DATABASE_URL=


ANTHROPIC_API_KEY =

### =========Application specific Config==========
#Maximum number of article a field can have
MAX_FIELD_ARTICLES = 500

LITE_MODEL = claude-3-5-haiku-20241022
PRO_MODEL = claude-3-5-sonnet-20241022

#Maximum number of article a field can have
MAX_FIELD_ARTICLES = 500
```

## Conclusion

This readme provides a basic overview of the AI article web application. For a more comprehensive understanding, refer to the code documentation and any additional resources provided by the developers.
