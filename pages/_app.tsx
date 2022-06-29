import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";

import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

import "../index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
