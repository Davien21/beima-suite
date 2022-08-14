// import { LoaderIcon } from "assets/images";
import { IStore } from "interfaces";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./page-loader.module.css";
import { useInterval } from "usehooks-ts";

export function PageLoader() {
  return (
    <div className={`${styles["container"]}`}>
      <div className={`${styles["content"]}`}>
        <LoaderIcon />
        <span>Take a chill pill while we organize your document</span>
      </div>
    </div>
  );
}

const LoaderIcon = () => {
  const { isPageLoading } = useSelector((state: IStore) => state.UIState);
  const [activeStep, setactiveStep] = useState<number>(1);
  const pathClass = (step: number) => {
    if (step === activeStep || step < activeStep) return `${styles["active"]}`;
  };
  useInterval(() => {
    if (activeStep === 4) setactiveStep(1);
    else setactiveStep(activeStep + 1);
  }, 800);

  return (
    <div className={`${styles["loader"]}`}>
      <svg
        width="84"
        height="83"
        viewBox="0 0 84 83"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={pathClass(1)}
          d="M0 0V39.3395H39.3669C39.3669 17.6095 21.739 0 0 0Z"
          fill="#3B4EF2"
        />
        <path
          className={pathClass(2)}
          d="M44.6273 0V39.3395H83.9941C83.9941 17.6095 66.3663 0 44.6273 0Z"
          fill="black"
        />
        <path
          className={pathClass(3)}
          d="M84 43.2798V82.6193H44.6331C44.6331 60.8893 62.261 43.2798 84 43.2798Z"
          fill="#3B4EF2"
        />
        <path
          className={pathClass(4)}
          d="M39.3727 43.1335V82.4731H0.00585938C0.00585938 60.743 17.6337 43.1335 39.3727 43.1335Z"
          fill="black"
        />
      </svg>
    </div>
  );
};
