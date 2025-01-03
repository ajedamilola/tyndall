"use client";

import { useEffect, useState } from "react";
import { redirectToAuth } from "supertokens-auth-react";
import SuperTokens from "supertokens-auth-react/ui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { signUp, signIn } from "supertokens-web-js/recipe/emailpassword";
import {
  getAuthorisationURLWithQueryParamsAndSetState,
  signInAndUp,
} from "supertokens-web-js/recipe/thirdparty";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Menu, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/app/constants";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { set } from "mongoose";
import { Loading } from "notiflix";
// Testimonial data

export default function Auth() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isSignIn, setIsSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loadingForSignUp, setLoadingForSignUp] = useState(false);
  const [loadingForSignIn, setLoadingForSignIn] = useState(false);

  const [hidePass, setHidePass] = useState(true);
  const [errorMessage, setSetErrorMessage] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
  };

  // if the user visits a page that is not handled by us (like /auth/random), then we redirect them back to the auth page.
  // const [loaded, setLoaded] = useState(false);
  // useEffect(() => {
  //   if (
  //     SuperTokens.canHandleRoute([
  //       ThirdPartyPreBuiltUI,
  //       EmailPasswordPreBuiltUI,
  //     ]) === false
  //   ) {
  //     redirectToAuth({ redirectBack: false });
  //   } else {
  //     setLoaded(true);
  //   }
  // }, []);

  // if (loaded) {
  //   return SuperTokens.getRoutingComponent([
  //     ThirdPartyPreBuiltUI,
  //     EmailPasswordPreBuiltUI,
  //   ]);
  // }

  useEffect(() => {
    if (email && password) {
      setSetErrorMessage({
        email: "",
        password: "",
      });
    }
  }, [email, password]);

  async function signUpClicked() {
    try {
      if (!email || !password) {
        setSetErrorMessage({
          email: "Email is required",
          password: "Password is required",
        });
        return;
      }

      setLoadingForSignUp(true);
      let response = await signUp({
        formFields: [
          {
            id: "email",
            value: email,
          },
          {
            id: "password",
            value: password,
          },
        ],
      });

      if (response.status === "FIELD_ERROR") {
        // one of the input formFields failed validation
        response.formFields.forEach((formField) => {
          if (formField.id === "email") {
            // Email validation failed (for example incorrect email syntax),
            // or the email is not unique.
            toast.error(formField.error);
          } else if (formField.id === "password") {
            // Password validation failed.
            // Maybe it didn't match the password strength
            toast.error(formField.error);
          }
        });
      } else if (response.status === "SIGN_UP_NOT_ALLOWED") {
        // the reason string is a user friendly message
        // about what went wrong. It can also contain a support code which users
        // can tell you so you know why their sign up was not allowed.
        toast.message(response.reason);
      } else {
        // sign up successful. The session tokens are automatically handled by
        // the frontend SDK.
        toast.success("Sign up successful!");
        setLoadingForSignUp(false);
        router.replace("/onboarding");
      }
    } catch (err) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        toast.message(err.message);
      } else {
        toast.message("Oops! Something went wrong.");
      }
    } finally {
      setLoadingForSignUp(false);
    }
  }

  async function signInClicked() {
    try {
      setLoadingForSignIn(true);
      let response = await signIn({
        formFields: [
          {
            id: "email",
            value: email,
          },
          {
            id: "password",
            value: password,
          },
        ],
      });

      switch (response.status) {
        case "FIELD_ERROR":
          // one of the input formFields failed validation
          response.formFields.forEach((formField) => {
            if (formField.id === "email") {
              // Email validation failed (for example incorrect email syntax),
              // or the email is not unique.
              toast.error(formField.error);
            } else if (formField.id === "password") {
              // Password validation failed.
              // Maybe it didn't match the password strength
              toast.error(formField.error);
            }
          });
          break;
        case "SIGN_UP_NOT_ALLOWED":
          // the reason string is a user friendly message
          // about what went wrong. It can also contain a support code which users
          // can tell you so you know why their sign up was not allowed.
          toast.message(response.reason);
          break;
        case "WRONG_CREDENTIALS_ERROR":
          // the email or password was incorrect
          toast.error("Incorrect email or password");
          break;
        case "OK":
          // sign up successful. The session tokens are automatically handled by
          // the frontend SDK.
          set;
          toast.success("Signed in successfully");
          router.replace("/onboarding");
          break;
      }
    } catch (err) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        toast.message(err.message);
      } else {
        toast.info("Oops! Something went wrong.");
      }
    } finally {
      setLoadingForSignIn(false);
    }
  }

  async function googleSignInClicked() {
    try {
      const url = new URL(window.location.href);
      const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
        thirdPartyId: "google",

        // This is where Google should redirect the user back after login or error.
        // This URL goes on the Google's dashboard as well.
        frontendRedirectURI: `http://${url.host}/auth/callback/google`,
      });
      // we redirect the user to google for auth.
      window.location.assign(authUrl);
    } catch (err) {
      console.log(err);
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        toast.message(err.message);
      } else {
        toast.message("Oops! Something went wrong.");
      }
    }
  }

  async function handleGoogleCallback() {
    //TODO: Micheali Micheali 📢📢📢📢📢📢📢📢📢📢 DO the state for loading. this is used to verify the Google Login
    if (!window.location.href.includes("callback")) return
    try {
      Loading.standard("Signing in...");
      const response = await signInAndUp();

      if (response.status === "OK") {
        // if (response.createdNewRecipeUser && response.user.loginMethods.length === 1) {
        //   // sign up successful
        // } else {
        //   // sign in successful
        // }ww
        router.replace("/onboarding");
      } else if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
        // the reason string is a user friendly message
        // about what went wrong. It can also contain a support code which users
        // can tell you so you know why their sign in / up was not allowed.
        toast.message(response.reason);
      } else {
        // SuperTokens requires that the third party provider
        // gives an email for the user. If that's not the case, sign up / in
        // will fail.

        // As a hack to solve this, you can override the backend functions to create a fake email for the user.

        toast.message(
          "No email provided by social login. Please use another form of login"
        );
        // window.location.assign("/auth"); // redirect back to login page
      }
    } catch (err) {
      console.log(err);
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        toast.message(err.message);
      } else {
        toast.message("Oops! Something went wrong.");
      }
    } finally {
      Loading.remove()
    }
  }

  useEffect(() => {
    handleGoogleCallback();
  }, []);

  return (
    <div className='h-dvh bg-[#1C1C1C] text-white'>
      {/* Header */}
      <header className='flex justify-between items-center p-4 lg:p-6'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 rounded-full bg-[#00B8A9]' />
          <span className='text-xl font-semibold font-manrope'>Tyndall</span>
        </div>
        <Button variant='ghost' size='icon' className='text-white'>
          <Menu className='h-6 w-6' />
        </Button>
      </header>

      {/* Main Content */}
      <main className='flex min-h-[calc(100vh-90px)] lg:flex-row'>
        {/* Form Section */}
        <div className='w-full lg:w-1/2 flex items-center justify-center p-4'>
          <div className='w-full max-w-md space-y-6'>
            <div className='space-y-2'>
              <h1 className='text-2xl font-semibold font-manrope'>
                {isSignIn ? "Welcome Back" : "Sign Up for Free"}
              </h1>
              <p className='text-gray-400 font-inter'>
                {isSignIn
                  ? "Sign in to your account"
                  : "Use your work email to enable the best collaboration experience."}
              </p>
            </div>

            <div className='space-y-4'>
              <div className='space-y-2'>
                <label htmlFor='email' className='text-sm text-gray-400'>
                  Email
                </label>
                <Input
                  id='email'
                  type='email'
                  placeholder={
                    isSignIn ? "Enter your work email" : "Work email"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='bg-[#2C2C2C] border-0 text-white h-12'
                />
                {errorMessage.email && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errorMessage.email}
                  </p>
                )}
              </div>

              <div className='space-y-2 '>
                <div className='flex items-center justify-between'>
                  <label htmlFor='password' className='text-sm text-gray-400'>
                    Password
                  </label>

                  {isSignIn && (
                    <a
                      href='#'
                      className='text-sm text-[#00B8A9] hover:underline'
                    >
                      Forgot password?
                    </a>
                  )}
                </div>

                <div className='relative'>
                  <Input
                    id='password'
                    type={hidePass ? "password" : "text"}
                    placeholder='Enter your password'
                    className='bg-[#2C2C2C] border-0 pr-10 text-white h-12'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errorMessage.password && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errorMessage.password}
                    </p>
                  )}

                  <div
                    onClick={() => setHidePass((prev) => !prev)}
                    className='cursor-pointer'
                  >
                    {hidePass ? (
                      <EyeOff className='absolute right-3 top-4 h-5 w-5 text-gray-400' />
                    ) : (
                      <Eye className='absolute right-3 top-4 h-5 w-5 text-gray-400' />
                    )}
                  </div>
                </div>
              </div>

              <Button
                className='w-full bg-[#00B8A9] hover:bg-[#00A598] text-white h-12'
                onClick={() => {
                  if (isSignIn) {
                    signInClicked();
                  } else {
                    signUpClicked();
                  }
                }}
              >
                {isSignIn
                  ? loadingForSignIn
                    ? "Loading..."
                    : "Sign In"
                  : loadingForSignUp
                    ? "Loading..."
                    : "Sign Up"}{" "}
              </Button>

              {!isSignIn && (
                <>
                  <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                      <span className='w-full border-t border-gray-700' />
                    </div>
                    <div className='relative flex justify-center text-xs uppercase'>
                      <span className='bg-[#1C1C1C] px-2 text-gray-400'>
                        OR
                      </span>
                    </div>
                  </div>

                  <Button
                    variant='outline'
                    className='w-full h-12 bg-[#2C2C2C] border-gray-700 text-white hover:bg-[#3C3C3C] hover:text-white'
                    onClick={googleSignInClicked}
                  >
                    <FcGoogle className='w-5 h-5' />
                    Continue with Google
                  </Button>
                </>
              )}

              <p className='text-center text-sm text-gray-400'>
                {isSignIn ? "Don't have an account? " : "Have an account? "}
                <button
                  onClick={toggleAuthMode}
                  className='text-[#00B8A9] hover:underline'
                >
                  {isSignIn ? "Sign Up" : "Sign in"}
                </button>
              </p>
            </div>

            <p className='text-xs text-gray-400 text-center'>
              By continuing, you are indicating that you have read and agree to
              the{" "}
              <a href='#' className='text-[#00B8A9] hover:underline'>
                Terms of Use
              </a>{" "}
              and{" "}
              <a href='#' className='text-[#00B8A9] hover:underline'>
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Testimonial Section - Only visible on larger screens */}
        <div className='hidden lg:flex w-1/2 items-center justify-center p-12 border-l border-gray-800'>
          <div className='max-w-xl space-y-8 overflow-hidden  '>
            <div className='text-6xl'>"</div>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className='space-y-8'
              >
                <p className='text-xl font-light leading-relaxed'>
                  {testimonials[currentTestimonial].quote}
                </p>
                <div className='space-y-2'>
                  <p className='font-medium'>
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className='text-gray-400'>
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className='flex gap-2'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentTestimonial
                    ? "bg-[#00B8A9]"
                    : "bg-gray-600"
                    }`}
                />
              ))}
            </div>
          </div>{" "}
        </div>
      </main>
    </div>
  );
}
