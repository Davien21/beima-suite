import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import {
  Button,
  EmptyWorkspace,
  SearchBox,
  ContractDisplay,
  UploadModal,
  ContractDescModal,
  BottomPanel,
  Header,
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
import { setIsUploadModalOpen } from "store/slices/modalSlice";
import { IStore } from "interfaces";

function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const contracts = useSelector((state: IStore) => state.contracts);
  const { documentation } = useSelector((state: IStore) => state.upload);
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

  return (
    <>
      <Header />
      <main className="hidden lg:block">
        <UploadModal />
        <ContractDescModal />
        <section className={`${styles["container"]} flex w-full`}>
          <div className={`flex flex-col ${styles["left"]}`}>
            <button
              className={`${tabClass("Workspace")} `}
              onClick={() => {
                setactiveTab("Workspace");
              }}
            >
              <div
                title="Open Workspace"
                className="py-7 block w-full flex-col"
              >
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
                  onClick={() => dispatch(setIsUploadModalOpen(true))}
                  secondary
                  className="import"
                >
                  <span className="text-sm">Import</span>
                </Button>
              </div>
              <div className="sticky-default bg-color flex justify-between items-center px-6 py-7 border-b gap-x-3">
                <SearchBox placeholder="Search using anything in the smart contract" />
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
            <div
              className={`col-span-9 ${styles["right"]} w-full flex flex-col justify-between`}
            >
              {children}
              <BottomPanel />
            </div>
          </div>
        </section>
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
}

export { DashboardLayout };
