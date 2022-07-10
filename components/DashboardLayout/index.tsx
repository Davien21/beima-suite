import React, { useState } from "react";
import styles from "./dashboard.module.css";
import {
  Button,
  EmptyWorkspace,
  SearchBox,
  ContractDisplay,
  UploadModal,
} from "components";

import {
  FilesIcon,
  FilterIcon,
  TooltipIcon,
  WelcomeImg,
  WorkspaceIcon,
} from "assets/images";
import { toast } from "react-toastify";

function DashboardLayout() {
  const [hasData, sethasData] = useState<boolean>(true);
  const [isShowingFilter, setisShowingFilter] = useState<boolean>(false);
  const toggleFilter = () => {
    setisShowingFilter(!isShowingFilter);
    toast.info("Filter is coming soon!");
  };
  const [activeTab, setactiveTab] = useState<string>("Workspace");
  const tabClass = (name: string) => {
    const defaults = `${styles["tab"]} block w-full px-4 xl:px-4 2xl:px-5`;
    if (name === activeTab) return `${defaults} ${styles["active"]}`;
    return defaults;
  };
  const [isModalActive, setisModalActive] = useState<boolean>(false);
  return (
    <>
      <UploadModal isActive={isModalActive} setIsActive={setisModalActive} />
      <section className={`${styles["container"]} flex w-full`}>
        <div className={`flex flex-col ${styles["left"]}`}>
          <button
            className={`${tabClass("Workspace")} `}
            onClick={() => {
              setactiveTab("Workspace");
            }}
          >
            <div title="Open Workspace" className="py-7 block w-full flex-col">
              <span className="text-center mb-2 flex justify-center">
                <WorkspaceIcon />
              </span>
              <p className="hidden xl:block text-center font-semibold text-sm">
                Workspace
              </p>
            </div>
          </button>
          <button
            className={`${tabClass("Documentation")} `}
            onClick={() => {
              setactiveTab("Documentation");
            }}
          >
            <div
              title="Open Documentation"
              className="py-7 block w-full flex-col"
            >
              <span className="text-center mb-2 flex justify-center">
                <FilesIcon />
              </span>
              <p className="hidden xl:block text-center font-semibold text-sm">
                Documentation
              </p>
            </div>
          </button>
          <button
            onClick={() => toast.info("This is coming soon!")}
            className="flex flex-col items-center gap-y-2 mt-auto mb-24 py-3"
          >
            <span>
              <TooltipIcon />
            </span>
            <span className="hidden xl:inline text-sm">Tool Tips</span>
          </button>
        </div>
        <div className={`w-full grid grid-cols-12 ${styles["container"]}`}>
          <div className={`col-span-3 ${styles["middle"]}`}>
            <div className="flex justify-between items-center px-6 py-8 border-b">
              <div className="font-semibold">
                <span className="hidden xl:inline">My </span>
                <span>Workspace</span>
              </div>
              <Button
                onClick={() => setisModalActive(true)}
                secondary
                className="import"
              >
                <span className="text-sm">Import</span>
              </Button>
            </div>
            <div className="sticky-default bg-default flex justify-between items-center px-6 py-7 border-b gap-x-3">
              <SearchBox />
              <button
                className={`${styles["filter"]} ${
                  isShowingFilter && styles["active"]
                }`}
                onClick={toggleFilter}
              >
                <FilterIcon />
              </button>
            </div>
            {!hasData && <EmptyWorkspace />}
            {hasData && (
              <div className="px-6 py-6">
                <ContractDisplay />
              </div>
            )}
          </div>
          <div className={`col-span-9 ${styles["right"]} w-full`}>
            <div className="mx-auto text-center mt-32">
              <div className="flex justify-center mb-4">
                <WelcomeImg />
              </div>
              <div className="text-center flex justify-center mb-14">
                <div className="w-7/12">
                  <h2 className="text-3xl font-semibold mb-6">
                    Welcome to Beima Suite
                  </h2>
                  <p className="">
                    Easily document your smart contracts, test and collaborate
                    in real-time with your teammates.
                  </p>
                </div>
              </div>
              <div className="mb-20">
                <Button secondary>Create Your First Documentation</Button>
              </div>
              <div className="flex justify-center items-center gap-x-5">
                <span>Important Tips:</span>
                <div className="flex gap-x-4">
                  <div className="flex items-center">
                    <div className="function mr-2">F</div>
                    <span
                      style={{ color: "#939393" }}
                      className="text-sm font-semibold"
                    >
                      Function
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="event mr-2">E</div>
                    <span
                      style={{ color: "#939393" }}
                      className="text-sm font-semibold"
                    >
                      Events
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="meta mr-2">Pb</div>
                    <span
                      style={{ color: "#939393" }}
                      className="text-sm font-semibold"
                    >
                      Public
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="meta mr-2">V</div>
                    <span
                      style={{ color: "#939393" }}
                      className="text-sm font-semibold"
                    >
                      View
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="meta mr-2">Pa</div>
                    <span
                      style={{ color: "#939393" }}
                      className="text-sm font-semibold"
                    >
                      Payable
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export { DashboardLayout };
