import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";

import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

import "../index.css";
import { AppProvider } from "../contexts/appContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}

export default MyApp;
