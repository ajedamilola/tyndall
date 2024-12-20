import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword'
import ThirdPartyReact from 'supertokens-auth-react/recipe/thirdparty'
import SessionReact from 'supertokens-auth-react/recipe/session'
import { appInfo } from './appInfo'

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
        signInAndUpFeature: {
          providers: [
            ThirdPartyReact.Google.init(),
            ThirdPartyReact.Facebook.init(),
            ThirdPartyReact.Github.init(),
            ThirdPartyReact.Apple.init(),
          ],
        },
      }),
      EmailPasswordReact.init(),
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