import React, { useState } from "react";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";

import styles from "./create.module.css";
import DragAndDropInput from "../../components/DragAndDropInput";

const validationSchema = Yup.object({
  file: Yup.mixed().required("Please include an image"),
  name: Yup.string().required("Item Name is required"),
  description: Yup.string().required("Item's description is required").min(5),
  price: Yup.string().required("Item's Price is required"),
});

const initialValues = {
  file: null,
  name: "",
  description: "",
  price: "",
};

function CreatePage(props) {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const handleSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <Head>
        <link rel="icon" href="./favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Create a documentation for your smart contract."
        />
        <meta name="keywords" content="Splinter, Documentation, Smart Contract, Postman"></meta>
        <title>Splinter | Document Smart Contract </title>
      </Head>
      <main className={`${styles["container"]} container`}>
        <section className="my-10 ">
          <div className="grid grid-cols-1 gap-x-10  xl:gap-x-20 2xl:gap-x-28 lg:grid-cols-6">
            <div className="col-span-1 lg:col-span-4">
              <div className="mb-5 md:mt-5">
                <h1 className="text-4xl ">
                  <span className="">Generate documentation for your </span>
                  <span className={`mx-2 ${styles["gradient-text"]}`}>smart contract</span>
                </h1>
              </div>
              <form onSubmit={formik.handleSubmit}></form>
              <div className="mt-5 mb-5">
                <p className="text-xl mb-1">Step - 1: Upload Main Smart contract file</p>
                <p className="app-text-grey">
                  Drag and drop or choose your file to upload.
                </p>
              </div>
              <DragAndDropInput name="file" formik={formik} />
 
            </div>
           
          </div>
        </section>
      </main>
    </>
  );
}

export default CreatePage;
