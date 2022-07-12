import { OpencontractIcon } from "assets/images";
import React, { useEffect, useState } from "react";
import { Switch } from "components";
import { ContractOptions } from "./options";
import Pstyles from "./contract-display.module.css";
import { ControlSwitch } from "./controlSwitch";
import { ContractList } from "./contractList";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleActiveControl,
  toggleContractOpen,
  toggleInheritedSwitch,
} from "store/slices/contractSlice";
import { capitalize } from "utils";

export function ContractTab({ index }: { index: number }) {
  const contract = useSelector((state: any) => state.contracts[index]);
  const dispatch = useDispatch();

  const handleChangeControl = (control: "function" | "event") => {
    dispatch(toggleActiveControl({ index, control }));
  };

  let tabClass = `${Pstyles["tab"]}`;
  if (contract.isOpen) tabClass += ` ${Pstyles["active"]}`;
  return (
    <div className={`${tabClass}`}>
      <button
        onClick={() => {
          dispatch(toggleContractOpen(index));
        }}
        className={`${Pstyles["contract"]} px-7 py-2 w-full flex items-center justify-between`}
      >
        <div className="flex gap-x-2">
          <OpencontractIcon className={`${Pstyles["open-btn"]}`} />
          <span className={`${Pstyles["name"]}`}>{contract.name}</span>
        </div>
        <ContractOptions />
      </button>
      {contract.isOpen && (
        <div>
          <div className="flex py-3 justify-between">
            <Switch
              label={`Inherited ${capitalize(contract.activeControl)}s`}
              isDisabled={false}
              checked={!contract.showInherited[contract.activeControl]}
              setChecked={() => {
                dispatch(
                  toggleInheritedSwitch({
                    index,
                    type: contract.activeControl,
                  })
                );
              }}
            />
            <ControlSwitch
              onChangeControl={handleChangeControl}
              activeControl={contract.activeControl}
            />
          </div>
          <hr />
          <ContractList
            isOpen={contract.isOpen}
            index={index}
            activeList={contract.activeControl}
            showInherited={contract.showInherited[contract.activeControl]}
          />
        </div>
      )}
    </div>
  );
}
