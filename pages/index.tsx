import type { NextPage } from "next";
import { useState } from "react";
import { Header, DashboardLayout } from "components";
import { LogoIcon } from "assets/images";

const Home: NextPage = () => {
  return (
    <>
      <header className="lg:hidden bg-default">
        <Header />
      </header>
      <main className="hidden lg:block">
        <Header />
        <DashboardLayout />
      </main>
      <main className="lg:hidden">
        <section className="container flex flex-col">
          <h1 className="text-center text-4xl mt-40 screen-size-msg">
            Please use a laptop or a bigger screen size to view Beima Suites
          </h1>
        </section>
      </main>
    </>
  );
};

export default Home;
