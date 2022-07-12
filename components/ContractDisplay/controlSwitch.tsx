import React from "react";
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
      btnClass += ` ${Pstyles["active"]} `;
    }
    return btnClass;
  };

  return (
    <div className={`${Pstyles["control-switch"]} flex gap-x-2`}>
      <button
        onClick={() => onChangeControl("function")}
        className={`${btnClass("function")}`}
      >
        <span className="5xl:hidden">F</span>
        <span className="hidden 5xl:block">Functions</span>
      </button>
      <button
        onClick={() => onChangeControl("event")}
        className={`${btnClass("event")}`}
      >
        <span className="5xl:hidden">E</span>
        <span className="hidden 5xl:block">Events</span>
      </button>
    </div>
  );
}
