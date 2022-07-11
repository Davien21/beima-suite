import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";

import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

import "../index.css";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import { Provider as StoreProvider } from "react-redux";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }: AppProps) {
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
            <Component {...pageProps} />
          </AnimatePresence>
        </PersistGate>
      </StoreProvider>
    </>
  );
}

export default MyApp;
