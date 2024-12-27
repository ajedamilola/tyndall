
export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: "Tyndall",
  apiDomain: process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://tyndall.vercel.app",
  websiteDomain: process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://tyndall.vercel.app",
  apiBasePath: "/api/auth",
  websiteBasePath: "/auth"
}
