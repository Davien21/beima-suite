import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";

import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

import "../index.css";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import {
  Provider as StoreProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { PageLoader } from "components";
import { IStore, NextPageWithLayout } from "interfaces";
import React, { useCallback, useEffect, useState } from "react";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";
import { getUserAPI } from "services/authService";
import { setUser } from "store/slices/authSlice";
import { uploadDocsAPI } from "services/docsService";
import { deleteTestContract } from "store/slices/testContractSlice";
import { useGetDocs } from "hooks/apis/useGetDocs";
import { setContracts } from "store/slices/contractSlice";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} />
      <Head>
        <link rel="icon" href="./favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Create a documentation for your smart contract."
        />
        <meta
          name="keywords"
          content="Beima, Beima Suite, Documentation, Blockchain Documentation, Smart Contract, Postman"
        ></meta>
        <title>Beima Suite | Document Smart Contract </title>
      </Head>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AnimatePresence exitBeforeEnter={true}>
            <Body Component={Component} pageProps={pageProps} router={router} />
          </AnimatePresence>
        </PersistGate>
      </StoreProvider>
    </>
  );
}

const Body = ({ Component, pageProps, router }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  const { isPageLoading } = useSelector((state: IStore) => state.UIState);
  return (
    <>
      {isPageLoading ? <PageLoader /> : ""}
      {getLayout(<Component {...pageProps} />)}
    </>
  );
};

export default MyApp;
