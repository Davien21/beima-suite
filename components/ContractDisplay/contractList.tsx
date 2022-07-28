import { getRandomKey } from "utils/randomKey";
import { IContract, IEvent, IFunction, IItem, ITypes } from "interfaces";
import React, { useState } from "react";
import { ListItem } from "./listItem";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { accordionVariants } from "animations";

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
  let items = contract.data.filter((item: IItem) => {
    if (item.type === activeList) {
      if (showInherited && item.isNative) return item;
      if (!showInherited) return item;
    }
  });

  return (
    <>
      <motion.div
        variants={{ open: { display: "block" }, closed: { display: "none" } }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        exit="closed"
        className="border-l pl-2 ml-6 3xl:ml-8 mt-4"
      >
        {items.map((item: IItem) => {
          return (
            <ListItem
              contract={contract}
              type={activeList}
              key={getRandomKey()}
              isChecked={!item.isHidden}
              itemId={item.id}
            />
          );
        })}
      </motion.div>
    </>
  );
}
