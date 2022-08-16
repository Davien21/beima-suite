import { Error404Icon } from "assets/images";
import { Button } from "components";
import { useRouter } from "next/router";
import React from "react";
import styles from "./404.module.css";

export default function NotFound({ route }: { route: string }) {
  const router = useRouter();
  const goToHome = () => router.push(route);
  
  return (
    <div>
      <main className={`${styles["container"]}`}>
        <section className="py-10 mt-20">
          <div className="pb-7 flex justify-center">
            <Error404Icon />
          </div>
          <h2 className="text-2xl font-bold text-center pb-1">
            {`Uh oh!, We can't find this item.`}
          </h2>
          <p className="text-center app-text-grey text-sm">
            This is an invalid page, click the button below to go to the home
            page.
          </p>
          <Button onClick={goToHome} className="mt-8 mx-auto" secondary>
            Go to HomePage
          </Button>
        </section>
      </main>
    </div>
  );
}
