import { Error500Icon } from "assets/images";
import { Button, Header } from "components";
import React from "react";
import styles from "./server-error.module.css";

export default function ServerErrorPage() {
  const goToHome = () => window.location.replace("https://beima.app");
  return (
    <div>
      <Header />
      <main className={`${styles["container"]}`}>
        <section className="py-10 mt-20">
          <div className="pb-7 flex justify-center">
            <Error500Icon />
          </div>
          <h2 className="text-2xl font-bold text-center pb-1">
            {`Oops!, Something went wrong.`}
          </h2>
          <p className="text-center app-text-grey text-sm">
            {`There was a problem with the server but don't worry, we're working to fix it as soon as possible.`}
          </p>
          <Button onClick={goToHome} className="mt-8 mx-auto" secondary>
            Go to HomePage
          </Button>
        </section>
      </main>
    </div>
  );
}
