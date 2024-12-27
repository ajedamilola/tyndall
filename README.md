# Tyndal



# Description

This readme documents Tyndall, a web application that uses AI to generate articles on a user-chosen area of interest.

The functionalities associated with the application are:
- Users Registration and Signing In
- Users can choose from a wide range of areas of Interests
- Users can like articles which will serve as Telementry to help the AI in generating better contents.
- Users can share Articles generated to other applications 


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

- Technologies used (Nextjs, Tailwindcss, Anthropic, SuperToken Auth.)
- Deployment details (Vercel)
<!-- - API documentation (if the application has a public API)
- How to contribute to the project (if it's open source) -->

## Getting Started

First, run the development server:

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
## Environmental Variables to start the project


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

### Database connection string This one is unique to u
DATABASE_URL=


ANTHROPIC_API_KEY = 

## #=========Application specific Config==========
#Maximum number of article a field can have
MAX_FIELD_ARTICLES = 500

LITE_MODEL = claude-3-5-haiku-20241022
PRO_MODEL = claude-3-5-sonnet-20241022

#Maximum number of article a field can have
MAX_FIELD_ARTICLES = 500  

## Conclusion

This readme provides a basic overview of the AI article web application. For a more comprehensive understanding, refer to the code documentation and any additional resources provided by the developers.
<!-- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->