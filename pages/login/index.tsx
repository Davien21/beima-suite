import React from "react";
import styles from "./login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button } from "components";
import { CircleCheckboxIcon, LogoIcon } from "assets/images";
import Link from "next/link";

const validationSchema = Yup.object({
  email: Yup.string().email().required("Email Address is required"),
  password: Yup.string().required("Password is required"),
  shouldRemember: Yup.boolean(),
});

type valuesType = {
  email: string;
  password: string;
  shouldRemember: boolean;
};

const initialValues: valuesType = {
  email: "",
  password: "",
  shouldRemember: false,
};
export default function LoginPage() {
  const handleSubmit = (values: valuesType) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  console.log(formik);
  const agreedSVGClass = formik.values.shouldRemember
    ? `${styles["agreed"]} ${styles["active"]}`
    : `${styles["agreed"]}`;

  return (
    <div
      className={`${styles["container"]} h-screen flex flex-col justify-center`}
    >
      <header className="bg-color">
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
                <h3 className="mb-3 text-2xl font-bold">Sign In</h3>
                <div className="mb-6">
                  <span style={{ color: "#A3A3A4" }}>
                    Already have an account?
                  </span>
                  <Link href="signup">
                    <span
                      className={`${styles["link"]} font-semibold cursor-pointer`}
                    >
                      {" "}
                      Sign Up Here
                    </span>
                  </Link>
                </div>
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
                <div className="flex justify-between items-center">
                  <div
                    className="flex items-start pt-3 gap-x-2 cursor-pointer"
                    onClick={() =>
                      formik.setFieldValue(
                        "shouldRemember",
                        !formik.values["shouldRemember"]
                      )
                    }
                  >
                    <div className={agreedSVGClass}>
                      <CircleCheckboxIcon />
                    </div>
                    <span className="text-sm">Remember me</span>
                  </div>
                  <Link href="lost-password">
                    <a>
                      <span className="text-sm">Lost Password?</span>
                    </a>
                  </Link>
                </div>

                <div className="">
                  <Button
                    disabled={!formik.dirty || !formik.isValid}
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
