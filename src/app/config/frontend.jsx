import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword'
import ThirdPartyReact from 'supertokens-auth-react/recipe/thirdparty'
import SessionReact from 'supertokens-auth-react/recipe/session'
import { appInfo } from './appInfo'
import { storeuser } from '../api/user/functions';

const routerInfo = {};

export function setRouter(
  router,
  pathName,
) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyReact.init({
        async onHandleEvent(context) {
          console.log(context)
          await storeuser({
            email: context.user.emails[0],
            id: context.user.id,
            provider: context.user.thirdParty[0].id
          })
          return true;
        },
        async getRedirectionURL(context) {
          if (context.action === "SUCCESS" && context.newSessionCreated) {
            // called on a successful sign in / up. Where should the user go next?
            let redirectToPath = context.redirectToPath;
            if (redirectToPath !== undefined) {
              // we are navigating back to where the user was before they authenticated
              return redirectToPath;
            }
            if (context.createdNewUser) {
              // user signed up
              return "/dashboard"
            } else {
              // user signed in
              return "/dashboard"
            }
          } else if (context.action === "TO_AUTH") {
            // called when the user is not authenticated and needs to be redirected to the auth page.
            return "/auth";
          }
          // return undefined to let the default behaviour play out
          return undefined;
        },
        signInAndUpFeature: {
          providers: [
            ThirdPartyReact.Google.init(),
            ThirdPartyReact.Github.init(),
            // ThirdPartyReact.Facebook.init()
          ],
        },
      }),
      EmailPasswordReact.init({
        async onHandleEvent(context) {
          await storeuser({
            email: context.user.emails[0],
            id: context.user.id,
            provider: "email"
          })
        }
      }),
      SessionReact.init(),
    ],
    windowHandler: (original) => ({
      ...original,
      location: {
        ...original.location,
        getPathName: () => routerInfo.pathName,
        assign: (url) => routerInfo.router.push(url.toString()),
        setHref: (url) => routerInfo.router.push(url.toString()),
      },
    }),
  }
}