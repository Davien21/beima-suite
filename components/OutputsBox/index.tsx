import { getRandomKey } from "utils";
import { TooltipIcon } from "assets/images";
import { IContractOutputs } from "interfaces";
import React from "react";
import styles from "./outputs-box.module.css";
import { Tooltip } from "components";

export function OutputsBox({ outputs }: { outputs: IContractOutputs[] }) {
  // if (!outputs.length) return <div></div>;
  const getDataTypeClass = (type: string) => {
    if (type.includes("uint")) return styles["uint"];
    if (type.includes("bytes")) return styles["bytes"];
    return styles[type];
  };

  let tableGroupsClass = "border-t grid grid-cols-2";
  if (outputs.length) tableGroupsClass += " border-b";
  const willScroll = outputs.length > 4;
  return (
    <div className={`${styles["container"]} `}>
      <div className="p-5 flex gap-x-4 items-center">
        <span className="grey font-medium">Output Parameters</span>
        <Tooltip
          placement="top"
          title={`There are ${
            outputs.length || "no"
          } output values for this function`}
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
        className={`${styles["output-list"]}`}
        style={willScroll ? { marginRight: "4px" } : {}}
      >
        {outputs.map((output) => {
          const defaults = getDataTypeClass(output.type);
          const typeClass = `${defaults} grey p-2 text-sm border-r`;
          return (
            <div key={getRandomKey()} className="grid grid-cols-2">
              <span className={typeClass}>{output.type}</span>
              <Tooltip title={output.name}>
                <span className="p-2 text-sm">{output.name || "-"}</span>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
}
