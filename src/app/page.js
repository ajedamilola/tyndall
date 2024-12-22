import { headers } from "next/headers";
import AuthRedirect from "./components/authRedirect";
import Logout from "./components/logout";
import SessionValidator from "./components/sessionValidator";




export default function Home() {
  //OPTIMIZE: API will be used to get ssr for dynamic data
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <AuthRedirect to={"/feed"} />
      <Logout />
    </div>
  );
}
