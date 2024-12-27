
export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: "Tyndall",
  apiDomain: process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://tyndall.onrender.com",
  websiteDomain: process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://tyndall.onrender.com",
  apiBasePath: "/api/auth",
  websiteBasePath: "/auth"
}
