import SuperTokens from "supertokens-node";
import ThirdPartyNode from "supertokens-node/recipe/thirdparty"
import EmailPasswordNode from "supertokens-node/recipe/emailpassword"
import SessionNode from 'supertokens-node/recipe/session'
import { appInfo } from './appInfo'
import Dashboard from "supertokens-node/recipe/dashboard";

export const backendConfig = () => {
  return {
    framework: "custom",
    supertokens: {
      // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: process.env.SUPER_TOKEN_CORE,
      apiKey: process.env.CORE_API_KEY,
    },
    appInfo,
    recipeList: [
      EmailPasswordNode.init(),
      ThirdPartyNode.init({
        // We have provided you with development keys which you can use for testing.
        // IMPORTANT: Please replace them with your own OAuth keys for production use.
        signInAndUpFeature: {
          providers: [
            {
              config: {
                thirdPartyId: "google",
                clients: [{
                  clientId: process.env.GOOGLE_CLIENT_ID,
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET
                }]
              }
            },
            {
              config: {
                thirdPartyId: "github",
                clients: [{
                  clientId: "467101b197249757c71f",
                  clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd"
                }]
              }
            },
            // {
            //   config: {
            //     thirdPartyId: "apple",
            //     clients: [{
            //       clientId: "4398792-io.supertokens.example.service",
            //       additionalConfig: {
            //         keyId: "7M48Y4RYDL",
            //         privateKey:
            //           "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
            //         teamId: "YWQCXGJRJL",
            //       }
            //     }]
            //   }
            // }
          ],
        }
      }),
      SessionNode.init(),
      Dashboard.init()
    ],
    isInServerlessEnv: true,
  }
}

let initialized = false;
// This function is used in your APIs to make sure SuperTokens is initialised
export function ensureSuperTokensInit() {
  if (!initialized) {
    SuperTokens.init(backendConfig());
    initialized = true;
  }
}