import { OpencontractIcon, OptionDotsIcon } from "assets/images";
import React, { useEffect, useState } from "react";
import { Switch } from "components";
import { ContractOptions } from "./options";
import Pstyles from "./contract-display.module.css";
import { ControlSwitch } from "./controlSwitch";
import { IContract } from "interfaces";
import { ContractList } from "./contractList";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { addContract, changeName } from "../../store/slices/contractSlice";
import { resetUploadState } from "../../store/slices/uploadSlice";

export function ContractTab({ contract }: { contract: IContract }) {
  const [isActive, setisActive] = useState<boolean>(false);
  const contracts = useSelector((state: any) => state.contracts);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (documentation) {
  //     dispatch(addContract(documentation));
  //     // dispatch(resetUploadState);
  //   }
  // }, [documentation]);
  // useEffect(() => {
  //   console.log(contracts);
  // }),
  //   [contracts];
 
  const [activeControl, setactiveControl] = useState<string>("Events");
  const handleChangeControl = (control: string) => {
    setactiveControl(control);
  };
  let tabClass = `${Pstyles["tab"]}`;
  if (isActive) tabClass += ` ${Pstyles["active"]}`;
  return (
    <div className={`${tabClass}`}>
      <button
        onClick={() => {
          // dispatch(changeName({ id: "371b97e16240e6", name: "Changed" }));
        }}
        className={`${Pstyles["contract"]} px-7 py-2 w-full flex items-center justify-between`}
      >
        <div className="flex gap-x-2">
          <OpencontractIcon className={`${Pstyles["open-btn"]}`} />
          <span className={`${Pstyles["name"]}`}>{contract?.name}</span>
        </div>
        <ContractOptions />
      </button>
      <div>
        <div className="flex py-3 justify-between">
          <Switch label="Inherited Functions" isDisabled={false} />
          <ControlSwitch
            onChangeControl={handleChangeControl}
            activeControl={activeControl}
          />
        </div>
        <hr />
        <ContractList isActive={isActive} id={contract.id} activeList={activeControl} />
      </div>
    </div>
  );
}
