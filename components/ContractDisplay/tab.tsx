import { OpencontractIcon } from "assets/images";
import React, { useCallback, useEffect, useState } from "react";
import { Switch } from "components";
import { ContractOptions } from "./options";
import Pstyles from "./contract-display.module.css";
import { ControlSwitch } from "./controlSwitch";
import { ContractList } from "./contractList";
import { useSelector, useDispatch } from "react-redux";
import { capitalize } from "utils";
import { useRouter } from "next/router";
import { IContract, IQuery, IStore, ITypes } from "interfaces";
import { setActiveControl, toggleInherited } from "store/slices/filterSlice";
import { toggleOpenContract } from "store/slices/UIStateSlice";

export function ContractTab({ contract }: { contract: IContract }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { activeControl, showInherited } = useSelector(
    (state: IStore) => state.filters
  );
  const { openContracts } = useSelector((state: IStore) => state.UIState);

  const { contractId, itemId } = router.query as IQuery;
  const isActive = contract._id === contractId;
  const isOpen = openContracts.includes(contract._id);

  const handleChangeControl = (control: ITypes) => {
    dispatch(setActiveControl(control));
  };

  const handleToggleOpenState = () => {
    console.log("toggleOpenState");
    dispatch(toggleOpenContract(contract._id));
  };

  let tabClass = `${Pstyles["tab"]}`;
  if (isActive) tabClass += ` ${Pstyles["active"]}`;
  return (
    <>
      <div className="flex pb-3 justify-between">
        <Switch
          label={`Inherited ${capitalize(activeControl)}s`}
          isDisabled={false}
          checked={!showInherited[activeControl]}
          setChecked={() => {
            dispatch(toggleInherited());
          }}
        />
        <ControlSwitch
          onChangeControl={handleChangeControl}
          activeControl={activeControl}
        />
      </div>
      <div className={`${tabClass}`}>
        <button
          onClick={handleToggleOpenState}
          className={`${Pstyles["contract"]} px-7 py-2 w-full flex items-center justify-between`}
        >
          <div className="flex gap-x-2">
            <OpencontractIcon className={`${Pstyles["open-btn"]}`} />
            <span className={`${Pstyles["name"]}`}>{contract.name}</span>
          </div>
          <ContractOptions contract={contract} />
        </button>
        <div>
          <ContractList
            isOpen={isOpen}
            contract={contract}
            activeList={activeControl}
            showInherited={showInherited[activeControl]}
          />
        </div>
      </div>
    </>
  );
}
