import { addIds, getRandomKey } from "utils/randomKey";
import { sampleContractData } from "data/samples";
import React, { useEffect, useState } from "react";
import { ContractTab } from "./tab";
import styles from "./contract-display.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addContract } from "store/slices";
import { resetUploadState } from "store/slices/uploadSlice";

export function ContractDisplay() {
  const contracts = useSelector((state: any) => state.contracts);
  const { documentation } = useSelector((state: any) => state.upload);
  const dispatch = useDispatch();

  useEffect(() => {
    if (documentation) {
      dispatch(addContract(documentation));
      dispatch(resetUploadState);
    }
  }, [documentation]);

  const [activeId, setactiveId] = useState<string>("");
  const isActiveContract = (id: string) => {
    return activeId === id ? true : false;
  };

  // console.log("ContractDisplay", contracts);

  return (
    <>
      {contracts.map((contract: any, index: number) => {
        return (
          <div key={getRandomKey()} className={`mb-3`}>
            <ContractTab index={index} />
          </div>
        );
      })}
    </>
  );
}
