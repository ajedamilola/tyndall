import { headers } from "next/headers";
import AuthRedirect from "./components/authRedirect";
import Logout from "./components/logout";
import SessionValidator from "./components/sessionValidator";
import Loader from "@/components/Loader";

export default function Home() {
  //OPTIMIZE: API will be used to get ssr for dynamic data
  return (
    <div className=''>
      <AuthRedirect path={"/feed"} />
      <Loader />
    </div>
  );
}
