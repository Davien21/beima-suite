import { getRandomKey } from "utils";
import React, { useEffect, useState } from "react";
import { ContractTab } from "./tab";
import { useSelector, useDispatch } from "react-redux";
import { IContract, IStore } from "interfaces";
import { EmptyWorkspace } from "components/EmptyWorkspace";
import { useGetContracts } from "hooks/apis/useGetContracts";

export function ContractDisplay() {
  const { user } = useSelector((state: IStore) => state.auth);
  const { data:contracts } = useGetContracts();
  const isLoggedIn = !!user.firstName;
  const testContract = useSelector((state: IStore) => state.testContract);
  const canShowTestContract = !isLoggedIn && !!testContract.name;
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
