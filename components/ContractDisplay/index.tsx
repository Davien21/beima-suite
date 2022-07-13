import { getRandomKey } from "utils";
import React from "react";
import { ContractTab } from "./tab";
import { useSelector, useDispatch } from "react-redux";
import { IContract } from "interfaces";

export function ContractDisplay() {
  const contracts = useSelector((state: any) => state.contracts);

  return (
    <>
      {contracts.map((contract: IContract, index: number) => {
        return (
          <div key={getRandomKey()} className={`mb-3`}>
            <ContractTab index={index} />
          </div>
        );
      })}
    </>
  );
}
