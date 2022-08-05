import { getRandomKey } from "utils/randomKey";
import { IContract, IItem, IQuery, ITypes } from "interfaces";
import React, { useEffect } from "react";
import { ListItem } from "./listItem";
import { useRouter } from "next/router";
import { useGetItem } from "hooks/apis";

export function ContractList({
  showInherited,
  isOpen,
  contract,
  activeList,
}: {
  showInherited: boolean;
  contract: IContract;
  isOpen: boolean;
  activeList: ITypes;
}) {
  const router = useRouter();
  const { contractId, itemId } = router.query as IQuery;
  const isActive = contract._id === contractId;
  let items = contract?.data?.filter((item: IItem) => {
    if (item.type === activeList) {
      if (showInherited && item.isNative) return item;
      if (!showInherited) return item;
    }
  });
  useEffect(() => {
    // console.log(isOpen);
  }, [isOpen]);
  const hasOpened = isOpen;
  return (
    <>
      {hasOpened && (
        <div className="border-l pl-2 ml-6 3xl:ml-8 mt-4">
          {items.map((item: IItem) => {
            return (
              <ListItem
                contract={contract}
                type={activeList}
                key={getRandomKey()}
                item={item}
                isChecked={!item.isHidden}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
