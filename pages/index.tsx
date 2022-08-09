import {
  BigFileIcon,
  DashboardLayout,
  Header,
  WelcomeScreen,
} from "components";
import { useSelector } from "react-redux";
import { IStore, NextPageWithLayout } from "interfaces";
import { getCookie } from "cookies-next";
import { getAuthToken } from "utils/helpers";
import { SWRConfig } from "swr";

const Home: NextPageWithLayout = () => {
  const testContract = useSelector((state: IStore) => state.testContract);
  const isEmpty = testContract.name.length === 0;
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

function HomePage({ fallback }: any) {
  console.log("fallback", fallback);
  return (
    <SWRConfig value={{ fallback }}>
      <Header />
      {/* <DashboardLayout currentUser={user}> */}
      <Home />
      {/* </DashboardLayout> */}
    </SWRConfig>
  );
}

export async function getServerSideProps(context: any) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/me`;
  const { req, res } = context;
  let user = await fetch(url, {
    headers: {
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTZjOWRkNThkMTEyMTFiNGUwZjAxMCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjYwMDU2ODk2LCJleHAiOjE2NjAxNDMyOTZ9.pjbit0DiZSOVzyKpEcdMRqZHmk41-_3U8jznNtuWFnc",
    },
    method: "POST", //switch to GET on backend
  });
  user = (await user.json()).data;
  console.log("user", user);
  return {
    props: {
      fallback: {
        [url]: user,
      },
    },
  };
}

export default HomePage;
