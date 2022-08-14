import { OpencontractIcon } from "assets/images";
import React from "react";
import { ContractOptions } from "./options";
import Pstyles from "./contract-display.module.css";
import { ContractList } from "./contractList";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { IContract, IQuery, IStore } from "interfaces";
import { toggleOpenContract } from "store/slices/UIStateSlice";

export function ContractTab({ contract }: { contract: IContract }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { activeControl, showInherited } = useSelector(
    (state: IStore) => state.filters
  );
  const { openContracts } = useSelector((state: IStore) => state.UIState);

  const { contractId, itemId } = router.query as IQuery;
  const isOpen = openContracts.includes(contract._id);

  const isActive = contract._id === contractId;

  const handleToggleOpenState = () => {
    // console.log("toggleOpenState");
    dispatch(toggleOpenContract(contract._id));
  };

  let tabClass = `${Pstyles["tab"]}`;
  if (isActive) tabClass += ` ${Pstyles["active"]}`;
  return (
    <>
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
