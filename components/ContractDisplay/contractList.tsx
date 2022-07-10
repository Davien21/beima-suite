import { useContractContext } from "contexts";
import { getRandomKey } from "utils/randomKey";
import { IContract, IEvent, IFunction } from "interfaces";
import React from "react";
import { ListItem } from "./listItem";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { toggleHiddenItem } from "store/slices";

export function ContractList({
  id,
  isActive,
  activeList,
}: {
  id: string;
  isActive: boolean;
  activeList: string;
}) {
  const contracts = useSelector((state: any) => state.contracts);
  const contract: any = contracts.find((item: IContract) => item.id === id);
  activeList = activeList.replace("s", "").toLowerCase();
  const dispatch = useDispatch();
  const variants = {
    open: { opacity: 1, height: "auto" },
    closed: {
      opacity: 0,
      height: 0,
    },
  };

  const { name, data } = contract;
  const toggleItemState = (name: string) => {
    dispatch(toggleHiddenItem({ id, name }));
    // console.log("toggleItemState", item);
  };
  return (
    <motion.div
      className="border-l pl-6 ml-8 mt-5"
      // initial="closed"
      // animate={isActive ? "open" : "closed"}
      // variants={variants}
      // exit="closed"
    >
      {data.map((item: IFunction | IEvent) => {
        if (item.type === activeList) {
          return (
            <ListItem
              type={activeList}
              key={getRandomKey()}
              isChecked={item.isHidden}
              name={item.name}
              onToggle={() => toggleItemState(item.name)}
            />
          );
        }
      })}
    </motion.div>
  );
}
