import Head from "next/head";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { LogoIcon, NotificationIcon, SettingsIcon } from "../../assets/images";
import { Button } from "../Button";
import styles from "./header.module.css";

function Header() {
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
      <header className="bg-color">
        <nav className={`${styles["container"]} `}>
          <div className="flex px-8 py-3 justify-between items-center border-b">
            <Link href="/">
              <a className={`${styles["logo"]} font-semibold text-gray-500`}>
                <LogoIcon />
              </a>
            </Link>

            <div className="flex gap-x-6 items-center">
              <div
                className="cursor-pointer"
                onClick={() => toast.info("This is coming soon!")}
              >
                <NotificationIcon />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => toast.info("This is coming soon!")}
              >
                <SettingsIcon />
              </div>
              <div className="flex gap-x-4">
                <Link href="login">
                  <a>
                    <Button className="text-sm font-semibold" secondary>
                      Log In
                    </Button>
                  </a>
                </Link>
                <Link href="signup">
                  <a>
                    <Button className="text-sm">
                      <span className="whitespace-nowrap font-semibold">
                        Create Account
                      </span>
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export { Header };
