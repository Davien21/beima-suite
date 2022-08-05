import { DragAndDropInput } from "components";
import { CircleCheckboxIcon } from "assets/images";
import React, { useEffect } from "react";
import styles from "./upload-tabs.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setUploadedContractData,
  setContractFile,
  setAbiFile,
  setUploadedABIData,
  setUploadedContractName,
} from "store/slices/uploadSlice";
import { getContractItemNames, getContractName } from "utils/generateDoc";

export default function UploadTabs() {
  const { activeTab, contractData, documentation, contractFile, abiFile } =
    useSelector((state: any) => state.upload);

  const dispatch = useDispatch();
  const handleFile = (file: File | null, type: string) => {
    if (file && type === "contract") dispatch(setContractFile(file));
    else if (file && type === "abi") dispatch(setAbiFile(file));
  };

  const activeClass = (tab: string) => {
    let tabClass = `${styles["tab"]} `;
    if (activeTab === tab) tabClass += `${styles["active"]} `;
    if (contractData && tab === "contract")
      tabClass += ` ${styles["success"]} `;
    if (abiFile && tab === "abi") tabClass += ` ${styles["success"]} `;

    return tabClass;
  };

  return (
    <>
      <div className="grid grid-cols-2 mt-8">
        <div className={activeClass("contract")}>
          <div className="text-center pb-3 flex items-center justify-center gap-x-2">
            {contractData && (
              <span>
                <CircleCheckboxIcon />
              </span>
            )}
            <span>Smart Contract</span>
          </div>
        </div>
        <div className={activeClass("abi")}>
          <div className="text-center pb-3">ABI File</div>
        </div>
      </div>
      <div className="p-16 mx-4">
        {activeTab === "contract" && (
          <DragAndDropInput
            file={contractFile}
            setFile={(file) => handleFile(file, "contract")}
            onFileChange={(file: File) => {
              const fileBlob = new Blob([file]);
              (async () => {
                const content = await fileBlob.text();
                const contracts = getContractItemNames(content);
                const name = getContractName(content);
                dispatch(setUploadedContractData(contracts));
                dispatch(setUploadedContractName(name));
              })();
            }}
            type={"sol"}
            name="contract"
            onRemove={() => {
              dispatch(setContractFile(null));
            }}
          />
        )}
        {activeTab === "abi" && (
          <DragAndDropInput
            file={abiFile}
            setFile={(file) => handleFile(file, "abi")}
            onFileChange={(file: File) => {
              const fileBlob = new Blob([file], { type: "application/json" });
              (async () => {
                const content = await fileBlob.text();
                let abi = JSON.parse(content);
                abi = abi?.abi || abi;
                dispatch(setUploadedABIData(abi));
              })();
            }}
            type={"json"}
            name="abi"
            onRemove={() => {
              dispatch(setAbiFile(null));
            }}
          />
        )}
      </div>
    </>
  );
}
