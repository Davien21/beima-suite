import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";

import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

import "../index.css";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import { Provider as StoreProvider } from "react-redux";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { PageLoader } from "components";
import { NextPageWithLayout } from "interfaces";
import React, { useEffect } from "react";

import { useRouteChangeHandler } from "hooks";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
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
  const { routeChanging } = useRouteChangeHandler();
  // useEffect(() => {
  //   console.log("route changing", routeChanging);
  // }, [routeChanging]);
  return (
    <>
      {/* {isPageLoading || routeChanging ? <PageLoader /> : ""} */}
      {routeChanging ? <PageLoader /> : getLayout(<Component {...pageProps} />)}
      {/* {getLayout(<Component {...pageProps} />)} */}
    </>
  );
};

export default MyApp;
