import { addIds, getRandomKey } from "utils/randomKey";
import { sampleContractData } from "data/samples";
import React, { useEffect, useState } from "react";
import { ContractTab } from "./tab";
import styles from "./contract-display.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addContract } from "store/slices";

export function ContractDisplay() {
  const contracts = useSelector((state: any) => state.contracts);
  const [contractArr, setcontractArr] = useState(contracts);
  const { documentation } = useSelector((state: any) => state.upload);
  const dispatch = useDispatch();
  console.log("documentation", documentation);
  useEffect(() => {
    if (documentation) {
      dispatch(addContract(documentation));
      const newContractArr = [...contractArr, documentation];
      setcontractArr(newContractArr);
      // dispatch(resetUploadState);
    }
  }, [documentation]);
  // const contracts = sampleContractData;
  // useEffect(() => {
  //   setallContracts(contracts);
  // });
  const [activeId, setactiveId] = useState<string>("");
  const isActiveContract = (id: string) => {
    return activeId === id ? true : false;
  };

  // console.log("ContractDisplay", contracts);

  return (
    <>
      {contractArr.map((contract: any, index) => {
        return (
          <div key={getRandomKey()} className={`mb-3`}>
            <ContractTab contract={contract} />
          </div>
        );
      })}
    </>
  );
}
