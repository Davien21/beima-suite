import React from "react";
import { toast } from "react-toastify";
import {
  NotificationIcon,
  SearchIcon,
  SettingsIcon,
} from "../../assets/images";
import { Button } from "../Button";
import styles from "./header.module.css";

function Header() {
  return (
    <nav className={`${styles["container"]} `}>
      <div className="flex px-8 py-3 justify-between items-center border-b">
        <div>
          <span className={`${styles["logo"]} font-semibold text-gray-500`}>
            Beima Suite
          </span>
        </div>
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
            <Button className="text-sm font-semibold" secondary>
              Log In
            </Button>
            <Button className="text-sm">
              <span className="whitespace-nowrap font-semibold">
                Create Account
              </span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export { Header };
