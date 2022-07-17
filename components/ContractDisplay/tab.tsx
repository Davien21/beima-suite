import { OpencontractIcon } from "assets/images";
import React, { useEffect, useState } from "react";
import { Switch } from "components";
import { ContractOptions } from "./options";
import Pstyles from "./contract-display.module.css";
import { ControlSwitch } from "./controlSwitch";
import { ContractList } from "./contractList";
import { useSelector, useDispatch } from "react-redux";
import { toggleInheritedSwitch } from "store/slices/contractSlice";
import { capitalize } from "utils";
import { useRouter } from "next/router";
import { ITypes } from "interfaces";

export function ContractTab({ index }: { index: number }) {
  const router = useRouter();
  const contract = useSelector((state: any) => state.contracts[index]);
  const dispatch = useDispatch();

  const { contractId, type, itemId } = router.query;
  const isActive = contract.id === contractId;
  const [isOpen, setisOpen] = useState<boolean>(isActive);
  const activeControl = (type as ITypes) || "function";
  const handleChangeControl = () => {
    const base = `${contractId}/${itemId}`;
    if (activeControl === "event") router.push(`/${base}?type=function`);
    if (activeControl === "function") router.push(`/${base}?type=event`);
  };

  let tabClass = `${Pstyles["tab"]}`;
  if (isActive) tabClass += ` ${Pstyles["active"]}`;
  return (
    <div className={`${tabClass}`}>
      <button
        onClick={() => setisOpen(!isOpen)}
        className={`${Pstyles["contract"]} px-7 py-2 w-full flex items-center justify-between`}
      >
        <div className="flex gap-x-2">
          <OpencontractIcon className={`${Pstyles["open-btn"]}`} />
          <span className={`${Pstyles["name"]}`}>{contract.name}</span>
        </div>
        <ContractOptions index={index} />
      </button>
      {isOpen && (
        <div>
          <div className="flex py-3 justify-between">
            <Switch
              label={`Inherited ${capitalize(activeControl)}s`}
              isDisabled={false}
              checked={!contract.showInherited[activeControl]}
              setChecked={() => {
                dispatch(
                  toggleInheritedSwitch({
                    index,
                    type: activeControl,
                  })
                );
              }}
            />
            <ControlSwitch
              onChangeControl={handleChangeControl}
              activeControl={activeControl}
            />
          </div>
          <hr />
          <ContractList
            isOpen={isOpen}
            index={index}
            activeList={activeControl}
            showInherited={contract.showInherited[activeControl]}
          />
        </div>
      )}
    </div>
  );
}
