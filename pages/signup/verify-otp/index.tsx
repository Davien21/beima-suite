import React, { useCallback, useEffect, useState } from "react";
import styles from "./verify-otp.module.css";
import { Button, OTPInput } from "components";
import Link from "next/link";

import { LogoIcon } from "assets/images";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useVerifyOTPQuery, verifyEmailAPI } from "services/authService";
import { errorMessage } from "utils/helpers";
import { setAuthToken } from "store/slices/authSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { IStore } from "interfaces";
import { useLocalStorage } from "usehooks-ts";

export default function VerifySignup() {
  const router = useRouter();
  const { email } = router.query as { email: string };
  // you need to guard this route.
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [jwt, setJwt] = useLocalStorage("beima-auth-token", "");
  const handleVerifyOTP = useCallback(
    async (token: string) => {
      setIsLoading(true);
      const { error, response } = await verifyEmailAPI({ email, token });
      if (error) toast.error(errorMessage(error));
      setIsLoading(false);
      if (response) {
        setIsVerified(true);
        setJwt(response.data.authToken);
        toast.success("Email was successfully verified");
      }
      if (error) toast.error(errorMessage(error));
    },
    [email, setJwt]
  );

  const handleContinue = () => {
    if (isVerified) router.push("/");
  };

  return (
    <div className={`${styles["container"]}`}>
      <header className="bg-color mt-32">
        <nav className="">
          <div className="flex justify-center px-14 pb-20 big-logo">
            <Link href="/">
              <a className={` cursor-pointer`}>
                <LogoIcon />
              </a>
            </Link>
          </div>
        </nav>
      </header>
      <main className="hidden lg:block bg-color">
        <section className=" flex justify-center items-center">
          <div className=" container gap-x-32">
            <div className="flex flex-col items-center ">
              <form className={`${styles["form"]} p-14 border`}>
                <h3 className="mb-3 text-2xl font-bold">OTP Verification</h3>
                <div className="mb-6">
                  <span style={{ color: "#A3A3A4" }}>
                    A 6-digit confirmation code was sent to your email address,
                    please enter below.
                  </span>
                </div>
                <OTPInput
                  isVerified={isVerified}
                  onVerify={handleVerifyOTP}
                  steps={6}
                />
                <div className="mt-4">
                  <Button
                    onClick={handleContinue}
                    isLoading={isLoading}
                    className="full-width"
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <main className="lg:hidden">
        <section className="container flex flex-col">
          <h1 className="text-center text-4xl mt-40 screen-size-msg">
            Please use a laptop or a bigger screen size to view Beima Suites
          </h1>
        </section>
      </main>
    </div>
  );
}
