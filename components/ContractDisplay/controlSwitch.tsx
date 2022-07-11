import React from "react";
import { HollowButton } from "components";
import Pstyles from "./contract-display.module.css";

export function ControlSwitch({
  activeControl,
  onChangeControl,
}: {
  activeControl: string;
  onChangeControl: (control: "function" | "event") => void;
}) {
  const btnClass = (control: string) => {
    let btnClass = activeControl;
    if (control === activeControl) {
      return (btnClass += ` ${Pstyles["active"]} `);
    }
  };

  return (
    <div className={`${Pstyles["control-switch"]} flex gap-x-2`}>
      <HollowButton
        onClick={() => onChangeControl("function")}
        className={`${btnClass("function")}`}
      >
        <span className="5xl:hidden">F</span>
        <span className="hidden 5xl:block">Functions</span>
      </HollowButton>
      <HollowButton
        onClick={() => onChangeControl("event")}
        className={`${btnClass("event")}`}
      >
        <span className="5xl:hidden">E</span>
        <span className="hidden 5xl:block">Events</span>
      </HollowButton>
    </div>
  );
}
