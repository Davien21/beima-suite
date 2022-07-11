import { getRandomKey } from "utils/randomKey";
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
  }, [documentation, dispatch]);

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
