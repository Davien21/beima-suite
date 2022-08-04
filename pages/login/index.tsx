import React, { useState } from "react";
import styles from "./login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button } from "components";
import { CircleCheckboxIcon, LogoIcon } from "assets/images";
import Link from "next/link";
import { loginAPI, verifyEmailAPI } from "services/authService";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { errorMessage } from "utils/helpers";
import { useLocalStorage } from "usehooks-ts";

const validationSchema = Yup.object({
  email: Yup.string().email().required("Email Address is required"),
  password: Yup.string().required("Password is required"),
  shouldRemember: Yup.boolean(),
});

type valuesType = {
  email: string;
  password: string;
  shouldRemember?: boolean;
};

const initialValues: valuesType = {
  email: "",
  password: "",
  shouldRemember: false,
};
export default function LoginPage() {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const router = useRouter();
  const [jwt, setJwt] = useLocalStorage("beima-auth-token", "");
  const handleSubmit = async (values: valuesType) => {
    setisLoading(true);
    let result = { ...values };
    delete result.shouldRemember;

    const { error, response } = await loginAPI(result);
    setisLoading(false);
    if (error) toast.error(errorMessage(error));

    if (response) {
      setJwt(response.data.authToken);
      router.push("/");
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const agreedSVGClass = formik.values.shouldRemember
    ? `${styles["agreed"]} ${styles["active"]}`
    : `${styles["agreed"]}`;

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
                <h3 className="mb-3 text-2xl font-bold">Sign In</h3>
                <div className="mb-6">
                  <span style={{ color: "#A3A3A4" }}>Not yet registered?</span>
                  <Link href="signup">
                    <a
                      className={`${styles["link"]} font-semibold cursor-pointer`}
                    >
                      {" "}
                      Sign Up Here
                    </a>
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
                    className="flex items-start gap-x-2 cursor-pointer"
                    onClick={() =>
                      formik.setFieldValue(
                        "shouldRemember",
                        !formik.values["shouldRemember"]
                      )
                    }
                  >
                    <button type="button" className={agreedSVGClass}>
                      <CircleCheckboxIcon />
                    </button>
                    <span className="text-sm">Remember me</span>
                  </div>
                  <Link href="forgot-password">
                    <a className="default-link">
                      <span className="text-sm">Lost Password?</span>
                    </a>
                  </Link>
                </div>

                <div className="">
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    disabled={!formik.dirty || !formik.isValid}
                    className="mt-4 full-width block"
                  >
                    Log in
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
