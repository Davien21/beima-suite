import type { NextPage } from "next";
import { BigFileIcon, DashboardLayout, WelcomeScreen } from "components";
import { useSelector } from "react-redux";
import { IStore, NextPageWithLayout } from "interfaces";
import { ReactElement } from "react";
import { useContracts, useUser } from "hooks/apis";

const Home: NextPageWithLayout = () => {
  const testContract = useSelector((state: IStore) => state.testContract);
  const { user } = useUser();
  const { contracts } = useContracts();
  const isEmpty = (user && !contracts?.length) || (!user && !testContract.name);
  return (
    <>
      {isEmpty ? (
        <WelcomeScreen />
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <div className="pt- 64">
            <BigFileIcon className={` mb-3`} />
          </div>
          <p className="grey text-base">
            Select a function to start documenting
          </p>
        </div>
      )}
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
