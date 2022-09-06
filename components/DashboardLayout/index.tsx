import React, { useCallback, useEffect, useState } from "react";

import styles from "./dashboard.module.css";
import {
  Button,
  SearchBox,
  ContractDisplay,
  UploadModal,
  ContractDescModal,
  ConfirmationModal,
  ActionModal,
  BottomPanel,
  Header,
  PageLoader,
  MobileScreen,
} from "components";

import {
  FilesIcon,
  FilterIcon,
  TooltipIcon,
  WorkspaceIcon,
} from "assets/images";

import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { setIsUploadModalOpen } from "store/slices/modalSlice";
import { IContract, IStore } from "interfaces";
import { useContracts, useUser } from "hooks/apis";
import { uploadContractsAPI } from "services/contractsService";
import {
  deleteTestContract,
  setTestContract,
} from "store/slices/testContractSlice";
import { usePropsForContract } from "hooks";
import produce from "immer";
import { ArrayMinusItem } from "utils/helpers";
import { deleteCookie } from "cookies-next";
import { multiTestUploadAction } from "components/ContractDisplay/meta";
import { useRouter } from "next/router";
import action from "services/actionModalService";

function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const [isShowingFilter, setisShowingFilter] = useState<boolean>(false);
  const [activeTab, setactiveTab] = useState<string>("Workspace");
  const dispatch = useDispatch();
  const testContract = useSelector((state: IStore) => state.testContract);
  const { user, isLoading: isUserLoading, apiMessage } = useUser();
  const {
    contracts,
    isLoading: isContractsLoading,
    mutate,
  } = usePropsForContract();

  const isLoading = isContractsLoading || isUserLoading;
  const handleSync = useCallback(async () => {
    if (isLoading) return;
    let newData = produce((contracts: any) => {
      contracts.data.push(testContract);
    });
    mutate(newData, false);

    let oldData = produce((contracts: any) => {
      (contracts.data as IContract[]).pop();
    });
    const { error, response } = await uploadContractsAPI([testContract]);
    if (response) dispatch(deleteTestContract());
    if (!error) return;
    toast.error("Error uploading your existing contracts", { autoClose: 2000 });
    mutate(oldData);
  }, [isLoading, testContract, mutate, dispatch]);

  useEffect(() => {
    if (!!user?.firstName && !!testContract.name) {
      handleSync();
    }
  }, [handleSync, testContract.name, user?.firstName]);

  useEffect(() => {
    if (apiMessage !== "Jwt expired") return;
    toast.error("Your session has expired. Please login again.");
    deleteCookie("beima-auth-token");
  }, [apiMessage]);

  if (isLoading) return <PageLoader />;

  const toggleFilter = () => {
    setisShowingFilter(!isShowingFilter);
    toast.info("Filter is coming soon!");
  };
  const tabClass = (name: string) => {
    const defaults = `${styles["tab"]} block w-full px-4 xl:px-4 2xl:px-5`;
    if (name === activeTab) return `${defaults} ${styles["active"]}`;
    return defaults;
  };

  const handleImport = () => {
    if (!testContract.name) dispatch(setIsUploadModalOpen(true));
    if (!user && testContract.name) {
      const onAction = () => router.push("/login");
      action.warning(multiTestUploadAction(onAction));
    }
  };

  return (
    <>
      <Header />
      <main className="hidden lg:block">
        <UploadModal />
        <ConfirmationModal />
        <ContractDescModal />
        <ActionModal />
        <section className={`${styles["container"]} flex w-full py`}>
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
                <Button onClick={handleImport} secondary className="import">
                  <span className="text-sm">Import</span>
                </Button>
              </div>
              {/* <div className="sticky-default bg-color flex justify-between items-center px-6 py-7 border-b gap-x-3">
                <SearchBox placeholder="Search using anything in the smart contract" />
                <button
                  className={`${styles["filter"]} ${
                    isShowingFilter && styles["active"]
                  }`}
                  onClick={toggleFilter}
                >
                  <FilterIcon />
                </button>
              </div> */}
              {!!!isContractsLoading && (
                <ContractDisplay contracts={contracts} />
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
      <MobileScreen />
    </>
  );
}

export { DashboardLayout };
