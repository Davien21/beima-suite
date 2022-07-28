import { getRandomKey } from "utils";
import React, { useState } from "react";
import { ContractTab } from "./tab";
import { useSelector, useDispatch } from "react-redux";
import { IContract, IStore } from "interfaces";
import { EmptyWorkspace } from "components/EmptyWorkspace";

export function ContractDisplay() {
  const [isLoggedIn] = useState<boolean>(false);
  const testContract = useSelector((state: IStore) => state.testContract);
  const canShowTestContract = !isLoggedIn && !!testContract.name;
  const contracts: IContract[] = [];
  const canShowMainContracts = isLoggedIn && contracts.length > 0;

  return (
    <div className="px-3 py-3">
      {canShowMainContracts === true &&
        contracts.map((contract: IContract, index: number) => {
          return (
            <div key={getRandomKey()} className={`mb-3`}>
              <ContractTab contract={contract} />
            </div>
          );
        })}
      {canShowTestContract === true && <ContractTab contract={testContract} />}
      {canShowMainContracts === false && canShowTestContract === false && (
        <EmptyWorkspace />
      )}
    </div>
  );
}
