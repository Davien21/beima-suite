import type { NextPage } from "next";
import { BigFileIcon, DashboardLayout, WelcomeScreen } from "components";
import { useSelector } from "react-redux";
import { IStore } from "interfaces";

const Home: NextPage = () => {
  const testContract = useSelector((state: IStore) => state.testContract);
  const isEmpty = testContract.name.length === 0;
  return (
    <>
      <DashboardLayout>
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
      </DashboardLayout>
    </>
  );
};

export default Home;
