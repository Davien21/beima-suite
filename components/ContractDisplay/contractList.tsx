import { getRandomKey } from "utils/randomKey";
import { IEvent, IFunction } from "interfaces";
import React, { useState } from "react";
import { ListItem } from "./listItem";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export function ContractList({
  showInherited,
  isOpen,
  index,
  activeList,
}: {
  showInherited: boolean;
  index: number;
  isOpen: boolean;
  activeList: string;
}) {
  const contract = useSelector((state: any) => state.contracts[index]);

  const { data } = contract;
  let items = data.filter((item: IEvent | IFunction) => {
    if (item.type === activeList) {
      if (showInherited && item.isNative) return item;
      if (!showInherited) return item;
    }
  });

  return (
    <>
      {isOpen && (
        <div className="border-l pl-2 ml-6 3xl:ml-8 mt-4">
          {items.map((item: IFunction | IEvent) => {
            return (
              <ListItem
                index={index}
                type={activeList}
                key={getRandomKey()}
                isChecked={!item.isHidden}
                name={item.name}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
