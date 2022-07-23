import { Button, Input } from "components";
import { CircleCheckboxIcon, LogoIcon, SignupImg } from "assets/images";
import React, { useEffect, useState } from "react";
import styles from "./signup.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useSignUpMutation } from "services/authService";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { IRTKQueryResponse } from "interfaces";
import { useMutationCall } from "hooks";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email().required("Email Address is required"),
  password: Yup.string().required("Password is required"),
  hasAgreed: Yup.boolean().isTrue("You must agree to our terms of use"),
});

type valuesType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  hasAgreed?: boolean;
};

const initialValues: valuesType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  hasAgreed: false,
};

export default function SignUpPage() {
  const router = useRouter();
  const [signUp] = useSignUpMutation();
  const { handler, isLoading } = useMutationCall();

  const handleSubmit = async (values: valuesType) => {
    if (isLoading) return;
    let user = { ...values };
    delete user.hasAgreed;

    const { data } = (await handler(() => signUp(user))) as IRTKQueryResponse;

    if (data.success) {
      toast.success("Successful, redirecting to Verification page", {
        onClose: () => router.push(`/signup/verify-otp?email=${user.email}`),
        autoClose: 3000,
      });
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const agreedSVGClass = formik.values.hasAgreed
    ? `${styles["agreed"]} ${styles["active"]}`
    : `${styles["agreed"]}`;

  return (
    <div className={`${styles["container"]}`}>
      <header className="bg-color">
        <nav className="px-14 py-5">
          <div className="inline-flex">
            <Link href="/">
              <a className={` cursor-pointer `}>
                <LogoIcon />
              </a>
            </Link>
          </div>
        </nav>
      </header>
      <main className="hidden lg:block bg-color">
        <section className="h-full flex justify-center items-center">
          <div className="h-full grid grid-cols-2 container gap-x-32 place-content-center">
            <div className="text-center  flex flex-col items-center justify-center">
              <h1 className="text-4xl mb-4 font-bold">
                Web3 Documentation Made Easy
              </h1>
              <p className={`${styles["grey"]}`}>
                Organize your smart contracts and ABI Files in your workspace.
                Build a well and arranged documentation file and share with your
                team.
              </p>
              <SignupImg />
            </div>
            <div className="flex flex-col items-center ">
              <form
                onSubmit={formik.handleSubmit}
                className={`${styles["form"]} p-14 border`}
              >
                <h3 className="mb-3 text-2xl font-bold">Create Account</h3>
                <div className="mb-6">
                  <span style={{ color: "#A3A3A4" }}>
                    Welcome to Beima, create your account and start documenting.
                    Already have an account?
                  </span>
                  <Link href="login">
                    <span
                      className={`${styles["link"]} pl-1 font-semibold cursor-pointer`}
                    >
                      Log In Here
                    </span>
                  </Link>
                </div>
                <Input
                  className={`mb-6`}
                  name="firstName"
                  formik={formik}
                  label="First Name"
                />
                <Input
                  className={`mb-6`}
                  name="lastName"
                  formik={formik}
                  label="Last Name"
                />
                <Input
                  className={`mb-6`}
                  name="email"
                  formik={formik}
                  label="Email"
                />
                <Input
                  type="password"
                  className={`mb-6`}
                  name="password"
                  formik={formik}
                  label="Password"
                />
                <button
                  type="button"
                  className="flex text-left items-start pt-3 gap-x-2 cursor-pointer"
                  onClick={(e) => {
                    formik.setFieldValue(
                      "hasAgreed",
                      !formik.values["hasAgreed"]
                    );
                    e.stopPropagation();
                  }}
                >
                  <div className={agreedSVGClass}>
                    <CircleCheckboxIcon />
                  </div>
                  <div className="text-sm">
                    <span style={{ color: "#A3A3A4" }} className="">
                      By signing up I agree to the{" "}
                    </span>
                    <span className="font-bold">
                      User Agreements, Privacy Policy, Cookie Policy, E-Sign
                      Consent.
                    </span>
                  </div>
                </button>
                <div className="">
                  <Button
                    isLoading={isLoading}
                    type="submit"
                    disabled={!formik.isValid || !formik.values["hasAgreed"]}
                    className="mt-4 full-width block"
                  >
                    Sign Up
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
