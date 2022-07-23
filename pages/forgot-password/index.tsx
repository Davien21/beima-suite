import { LogoIcon } from "assets/images";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import styles from "./forgot-password.module.scss";
import { Button, Input } from "components";
import { useRouter } from "next/router";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email must be a valid email")
    .required("Email Address is required"),
});

type valuesType = {
  email: string;
};

const initialValues: valuesType = {
  email: "",
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const handleSubmit = (values: valuesType) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={`${styles["container"]} `}>
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
              <form
                onSubmit={formik.handleSubmit}
                className={`${styles["form"]} p-14 border`}
              >
                <h3 className="mb-3 text-2xl font-bold">Lost Password</h3>
                <div className="mb-6">
                  <span style={{ color: "#A3A3A4" }}>
                    Lost your password? Don’t worry we have a spare key for you.
                  </span>
                </div>
                <Input
                  className={`mb-8`}
                  name="email"
                  formik={formik}
                  label="Email"
                />
                <div>
                  <Button
                    onClick={() => router.push("/reset-password")}
                    disabled={!formik.dirty || !formik.isValid}
                    className="mt-4 mb-6 full-width block"
                  >
                    Continue
                  </Button>
                </div>
                <div className="">
                  <span style={{ color: "#A3A3A4" }}>
                    Did you remember the password?
                  </span>
                  <Link href="/login">
                    <a
                      className={`${styles["link"]} font-semibold cursor-pointer`}
                    >
                      {" "}
                      Sign in
                    </a>
                  </Link>
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
