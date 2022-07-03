import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";

import styles from "./create.module.css";
import { DragAndDropInput } from "components";
import { IContractData, useAppContext } from "../../contexts/appContext";
import { filterContract } from "../../utils";
import { filterABI } from "../../utils/filterSmartContract";
import { useRouter } from "next/router";

const validationSchema = Yup.object({
  smartContract: Yup.mixed().required(
    "Please include a Solidity File for your Smart Contract"
  ),
  ABI: Yup.mixed().required("Please include an ABI for your Smart Contract"),
});

type valuesType = {
  smartContract: File | null;
  ABI: File | null;
};

const initialValues: valuesType = {
  smartContract: null,
  ABI: null,
};

function CreatePage(props: any) {
  const router = useRouter();
  const { ABIData, setABIData, contractData, setcontractData } =
    useAppContext();

  const handleSubmit = (values: valuesType) => {
    if (values.smartContract && values.ABI) {
      const smartContractBlob = new Blob([values.smartContract]);
      const ABIBlob = new Blob([values.ABI]);

      (async () => {
        const contractData = await smartContractBlob.text();
        const ABIData = await ABIBlob.text();
        setcontractData(filterContract(contractData));
        setABIData(filterABI(ABIData));
      })();
      // console.log(values);
    }
    router.push("/edit");
  };

  useEffect(() => {
    console.log(contractData);
  }, [contractData]);

  useEffect(() => {
    console.log(ABIData);
  }, [ABIData]);

  const handleSmartContractFile = (file: File) => {
    // setcontractData(data);
  };

  const handleABIFile = (data: File) => {
    // setABIData(data);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Head>
        {/* <link rel="icon" href="./favicon.svg" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Create a documentation for your smart contract."
        />
        <meta
          name="keywords"
          content="Splinter, Documentation, Smart Contract, Postman"
        ></meta>
        <title>Splinter | Document Smart Contract </title>
      </Head>
      <main className={`${styles["container"]} container`}>
        <section className="my-10 ">
          <div className="grid grid-cols-1 gap-x-10  xl:gap-x-20 2xl:gap-x-28 lg:grid-cols-6">
            <div className="col-span-1 lg:col-span-4">
              <div className="mb-5 md:mt-5">
                <h1 className="text-4xl ">
                  <span className="">Document your</span>
                  <span className={`mx-2 ${styles["gradient-text"]}`}>
                    smart contract
                  </span>
                </h1>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mt-5 mb-8">
                  <p className={`text-xl mb-2 app-text-grey`}>
                    Step - 1: Upload Smart contract File
                    {formik.values["smartContract"] && " ✅"}
                  </p>
                  <DragAndDropInput
                    onFileChange={handleSmartContractFile}
                    type={"sol"}
                    name="smartContract"
                    formik={formik}
                  />
                </div>
                <div className="mt-5 mb-4">
                  <p className="text-xl mb-2 app-text-grey">
                    Step - 2: Upload ABI File
                    {formik.values["ABI"] && " ✅"}
                  </p>
                  <DragAndDropInput
                    onFileChange={handleABIFile}
                    type={"json"}
                    name="ABI"
                    formik={formik}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!formik.dirty || !formik.isValid}
                    className="rounded px-4 py-2 bg-fuchsia-500 text-white disabled:saturate-0"
                  >
                    Preview Docs
                  </button>
                </div>
              </form>
            </div>
          </div>
          <ul>
            <li className="px-6 py-2 w-full rounded-b-lg">
              <span className="function-icon rounded px-3 py-3">F</span>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

export default CreatePage;
