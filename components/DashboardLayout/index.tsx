import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import {
  Button,
  EmptyWorkspace,
  SearchBox,
  ContractDisplay,
  UploadModal,
  WelcomeScreen,
  BottomPanel,
  BigFileIcon,
} from "components";

import {
  FilesIcon,
  FilterIcon,
  TooltipIcon,
  WorkspaceIcon,
} from "assets/images";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addContract } from "store/slices";
import { resetUploadState } from "store/slices/uploadSlice";

function DashboardLayout() {
  const contracts = useSelector((state: any) => state.contracts);
  const { documentation } = useSelector((state: any) => state.upload);
  const dispatch = useDispatch();

  useEffect(() => {
    if (documentation) {
      dispatch(addContract(documentation));
      dispatch(resetUploadState());
    }
  }, [documentation, dispatch]);

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
            {!contracts.length ? <EmptyWorkspace /> : ""}
            {contracts.length ? (
              <div className="px-6 py-6">
                <ContractDisplay />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={`col-span-9 ${styles["right"]} w-full flex flex-col`}>
            {!contracts.length ? (
              <WelcomeScreen onOpenUploadModal={() => setisModalActive(true)} />
            ) : (
              ""
            )}
            {contracts.length ? (
              <div className="flex flex-col justify-center items-center h-full">
                <div className="pt- 64">
                  <BigFileIcon className={`${styles["big-file"]} mb-3`} />
                </div>
                <p className="grey text-base">
                  Select a function to start documenting
                </p>
              </div>
            ) : (
              ""
            )}
            <BottomPanel />

            {/* {contracts.length && <WelcomeScreen />} */}
          </div>
        </div>
      </section>
    </>
  );
}

export { DashboardLayout };
