import React from "react";
import { HollowButton } from "components";
import styles from "./segmented-control.module.css";
import { getRandomKey } from "utils";

export function SegmentedControl({
  controls,
  activeControl,
  onChangeControl,
}: {
  controls: any[];
  activeControl: any;
  onChangeControl: (control: any) => void;
}) {
  return (
    <div className={`${styles["container"]} flex gap-x-2`}>
      {controls.map((control: any) => {
        let btnClass = control.toLowerCase().replace(/s/, "");
        if (control === activeControl) {
          btnClass += ` ${styles["active"]} `;
        }
        return (
          <HollowButton
            key={getRandomKey()}
            onClick={() => onChangeControl(control)}
            className={`${btnClass}`}
          >
            {control}
          </HollowButton>
        );
      })}
    </div>
  );
}
