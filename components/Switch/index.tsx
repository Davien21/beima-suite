import React, { useState } from "react";
import styles from "./switch.module.css";

export function Switch({
  isDisabled,
  label,
}: {
  isDisabled?: boolean;
  label: string;
}) {
  const [checked, setchecked] = useState<boolean>(false);
  let switchClass = `${styles["container"]} ${checked ? styles["active"] : ""}`;
  if (isDisabled) switchClass += ` ${isDisabled ? styles["disabled"] : ""}`;

  const toggle = () => !isDisabled && setchecked(!checked);

  return (
    <div className={`flex gap-x-2 items-center`} style={{ width: "auto" }}>
      <div className={`${switchClass} flex gap-x-2 items-center`}>
        <input type="checkbox" onChange={() => toggle()} checked={checked} />
        <div onClick={() => toggle()} className={`${styles["btn"]}`}></div>
      </div>
      <label onClick={() => toggle()}>{label}</label>
    </div>
  );
}
