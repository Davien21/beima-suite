import { Select } from "components/Select";
import { Tooltip } from "components/Tooltip";
import { useUser } from "hooks/apis";
import { IAuth, IContract, IStore } from "interfaces";
import Head from "next/head";
import Link from "next/link";
import React, { Suspense, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";
import { getFullName, getUserInitials } from "utils";
import { LogoIcon, NotificationIcon, SettingsIcon } from "../../assets/images";
import { Button } from "../Button";
import styles from "./header.module.css";
import { HeaderOptions } from "./HeaderOptions";

function Header() {
  const { user: userData } = useUser();
  console.log("data", userData);
  const { user } = useSelector((state: IStore) => state.auth);
  const isLoggedIn = !!user.firstName;
  const fullName = getFullName(user);
  const initials = getUserInitials(user);

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
      <nav className={`${styles["container"]} `}>
        <div className="h-full flex px-8 py-3 justify-between items-center border-b">
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
            <div className="flex gap-x-4 items-center">
              {isLoggedIn ? (
                <>
                  <HeaderOptions>
                    <div className={`${styles["initials"]}`}>
                      <span>{initials}</span>
                    </div>
                  </HeaderOptions>
                  <div className={`${styles["fullname"]}`}>{fullName}</div>
                </>
              ) : (
                <>
                  {" "}
                  <Link href="/login">
                    <a>
                      <Button className="text-sm font-semibold" secondary>
                        Log In
                      </Button>
                    </a>
                  </Link>
                  <Link href="/signup">
                    <a>
                      <Button className="text-sm">
                        <span className="whitespace-nowrap font-semibold">
                          Create Account
                        </span>
                      </Button>
                    </a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export { Header };
