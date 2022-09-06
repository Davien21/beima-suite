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
import React from "react";

import { useRouteChangeHandler } from "hooks";
import { ErrorBoundary } from "components/ErrorBoundary";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const layout = Component.getLayout ?? ((page) => page);
  const { routeChanging } = useRouteChangeHandler();
  const BodyComponent = layout(<Component {...pageProps} />);

  return (
    <>
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
      <ErrorBoundary>
        <ToastContainer position="top-center" autoClose={3000} />

        <StoreProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AnimatePresence exitBeforeEnter={true}>
              {routeChanging ? <PageLoader /> : BodyComponent}
            </AnimatePresence>
          </PersistGate>
        </StoreProvider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
