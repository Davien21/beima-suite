import { Select } from "components/Select";
import { Tooltip } from "components/Tooltip";
import { IAuth, IStore } from "interfaces";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetUserWithAuthTokenQuery } from "services/authService";
import { getFullName, getUserInitials } from "utils";
import { LogoIcon, NotificationIcon, SettingsIcon } from "../../assets/images";
import { Button } from "../Button";
import styles from "./header.module.css";
import { HeaderOptions } from "./HeaderOptions";

function Header() {
  const {
    isLoggedIn,
    user,
    beimaAuthToken: authToken,
  } = useSelector((state: IStore) => state.auth);
  const { data, refetch } = useGetUserWithAuthTokenQuery(
    { authToken },
    { skip: !authToken }
  );

  // (async () => {
  //   const base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  //   const res = await fetch(`${base}/auth/me`, {
  //     headers: { Authorization: `Bearer ${authToken}` },
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // })();
  // refetch();
  console.log({ authToken, data });
  const fullName = getFullName(user);
  const initials = getUserInitials(user);
  const nameToolTip = fullName.length > 13 ? fullName : "";
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
      </header>
    </>
  );
}

export { Header };
