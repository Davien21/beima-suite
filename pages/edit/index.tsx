import React, { useState } from "react";
import { IContractData, useAppContext } from "../../contexts/appContext";

export default function Edit() {
  const { ABIData, contractData, setABIData, setcontractData } =
    useAppContext();
  console.log(ABIData, contractData);
  const [isHidingNative, setisHidingNative] = useState<boolean>(false);

  return (
    <section className="container">
      {contractData.functions.length > 0 && (
        <>
          <div className="mt-7 mb-4 items-center flex gap-x-3">
            {isHidingNative ? (
              <button
                onClick={() => setisHidingNative(!isHidingNative)}
                className="rounded px-6 py-2 bg-red-600 text-white"
              >
                Hide
              </button>
            ) : (
              <button
                onClick={() => setisHidingNative(!isHidingNative)}
                className="rounded px-6 py-2 bg-blue-400 text-white"
              >
                Show
              </button>
            )}
            <p className={`font-coolvetica text-lg`}>Native Functions:</p>
          </div>

          {!isHidingNative && (
            <ul className="bg-white rounded-lg border border-gray-200 w-full text-gray-900">
              {contractData.functions.map((func, index) => {
                if (index === contractData.functions.length - 1)
                  return (
                    <li key={index} className="px-6 py-2 w-full rounded-b-lg">
                      {index + 1}. {func}
                    </li>
                  );
                return (
                  <li
                    key={index}
                    className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                  >
                    {index + 1}. {func}
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
