import { capitalize, getRandomKey } from "utils";
import React, { useEffect, useState } from "react";
import { ContractTab } from "./tab";
import { useSelector, useDispatch } from "react-redux";
import { IContract, IStore, ITypes } from "interfaces";
import { EmptyWorkspace } from "components/EmptyWorkspace";
import { useUser } from "hooks/apis";
import { Skeleton } from "antd";
import { Switch } from "components/Switch";
import { ControlSwitch } from "./controlSwitch";
import { setActiveControl, toggleInherited } from "store/slices/filterSlice";
import styles from "./contract-display.module.css";

export function ContractDisplay({ contracts }: { contracts: IContract[] }) {
  const dispatch = useDispatch();
  const testContract = useSelector((state: IStore) => state.testContract);
  const { user } = useUser();

  const { activeControl, showInherited } = useSelector(
    (state: IStore) => state.filters
  );

  const handleChangeControl = (control: ITypes) => {
    dispatch(setActiveControl(control));
  };

  const canShowTestContract = !!(!user && !!testContract.name);
  const canShowMainContracts = !!(user && contracts?.length > 0);

  return (
    <div className="px-3 pb-3">
      {(canShowTestContract || canShowMainContracts) && (
        <div className={`py-3 ${styles["inherited-functions-filter"]}`}>
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
      )}

      {canShowMainContracts && (
        <>
          <div>
            {contracts.map((contract: IContract, index: number) => {
              return (
                <div key={getRandomKey()} className={`mb-3`}>
                  <ContractTab contract={contract} />
                </div>
              );
            })}
          </div>
        </>
      )}

      {canShowTestContract && <ContractTab contract={testContract} />}
      {!canShowMainContracts && !canShowTestContract && <EmptyWorkspace />}
    </div>
  );
}

const Loader = () => {
  return (
    <div className="p-3">
      <Skeleton active style={{ borderRadius: "10px" }} />
    </div>
  );
};
