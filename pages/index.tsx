import type { NextPage } from "next";
import { BigFileIcon, DashboardLayout, WelcomeScreen } from "components";
import { useSelector } from "react-redux";

const Home: NextPage = () => {
  const contracts = useSelector((state: any) => state.contracts);

  return (
    <>
      <DashboardLayout>
        {!contracts.length ? <WelcomeScreen /> : ""}
        {contracts.length ? (
          <div className="flex flex-col justify-center items-center h-full">
            <div className="pt- 64">
              <BigFileIcon className={` mb-3`} />
            </div>
            <p className="grey text-base">
              Select a function to start documenting
            </p>
          </div>
        ) : (
          ""
        )}
      </DashboardLayout>
    </>
  );
};

export default Home;
