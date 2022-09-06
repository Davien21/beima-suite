import { LaptopIcon } from "assets/images";
import React from "react";
import styles from "./mobile-screen.module.css";

export function MobileScreen() {
  return (
    <div className="lg:hidden">
      <main className={`${styles["container"]}`}>
        <section className="px-8 pt-10 mt-6 lg:mt-20">
          <div className="pb-7 flex justify-center">
            <LaptopIcon />
          </div>
          <h2 className="text-2xl font-bold text-center pb-1 app-text-blue">
            {`Use your laptop.`}
          </h2>
          <p className="text-center app-text-grey text-sm">
            It appears you are using your phone or tablet. Please switch to your
            laptop to use Beima.
          </p>
        </section>
      </main>
    </div>
  );
}
