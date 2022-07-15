import { getRandomKey } from "utils";
import { TooltipIcon } from "assets/images";
import { IContractInputs } from "interfaces";
import React from "react";
import styles from "./inputs-box.module.css";
import { Tooltip } from "components";

export function InputsBox({ inputs }: { inputs: IContractInputs[] }) {
  const getDataTypeClass = (type: string) => {
    if (type.includes("uint")) return styles["uint"];
    if (type.includes("bytes")) return styles["bytes"];
    return styles[type];
  };

  let tableGroupsClass = "border-t grid grid-cols-2";
  if (inputs.length) tableGroupsClass += " border-b";
  const willScroll = inputs.length > 4;

  return (
    <div className={`${styles["container"]} `}>
      <div className="p-5 flex gap-x-4 items-center">
        <span className="grey font-medium">Input Parameters</span>
        <Tooltip
          placement="top"
          title={`There are ${
            inputs.length || "no"
          } input values for this function`}
        >
          <TooltipIcon />
        </Tooltip>
      </div>
      <div
        style={willScroll ? { paddingRight: "6px" } : {}}
        className={tableGroupsClass}
      >
        <span className="grey py-2 text-center text-sm border-r">
          Data Type
        </span>
        <span className="grey py-2 text-center text-sm">Params</span>
      </div>
      <div
        className={`${styles["input-list"]}`}
        style={willScroll ? { marginRight: "4px" } : {}}
      >
        {inputs.map((input) => {
          const defaults = getDataTypeClass(input.type);
          const typeClass = `${defaults} grey p-2 text-sm border-r`;
          return (
            <div key={getRandomKey()} className="grid grid-cols-2">
              <span className={typeClass}>{input.type}</span>
              <Tooltip title={input.name}>
                <span className="p-2 text-sm">{input.name}</span>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
}
