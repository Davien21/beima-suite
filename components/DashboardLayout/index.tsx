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
            {!contracts.length ? <WelcomeScreen /> : ""}
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

const BigFileIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      width="54"
      height="60"
      viewBox="0 0 54 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.750011 18.3335L18.2588 0.833496H50.3275C51.9375 0.833496 53.25 2.16058 53.25 3.72683V56.2735C53.2492 57.0411 52.9438 57.777 52.4007 58.3196C51.8576 58.8621 51.1214 59.1668 50.3538 59.1668H3.64626C3.26324 59.1642 2.88449 59.0861 2.53164 58.937C2.1788 58.788 1.85877 58.5709 1.58982 58.2981C1.32088 58.0254 1.10829 57.7024 0.964197 57.3475C0.820101 56.9926 0.74732 56.6128 0.750011 56.2297V18.3335ZM21.1667 6.66683V21.2502H6.58334V53.3335H47.4167V6.66683H21.1667Z"
        fill="#E2DCDC"
      />
    </svg>
  );
};

export { DashboardLayout };
