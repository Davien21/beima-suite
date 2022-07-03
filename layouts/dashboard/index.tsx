import React, { useState } from "react";
import { FilesIcon, WorkspaceIcon } from "../../assets/images";
import styles from "./dashboard.module.css";

function DashboardLayout() {
  const [activeTab, setactiveTab] = useState<string>("Workspace");
  const tabClass = (name: string) => {
    const defaults = `${styles["tab"]} block w-full`;
    if (name === activeTab) return `${defaults} ${styles["active"]}`;
    return defaults;
  };

  return (
    <div className={`grid grid-cols-12 ${styles["container"]}`}>
      <div className={`col-span-1 bg-red-300 ${styles["left"]}`}>
        <button
          className={`${tabClass("Workspace")} `}
          onClick={() => {
            setactiveTab("Workspace");
          }}
        >
          <div className="py-8 block w-full flex-col">
            <span className="text-center mb-2 flex justify-center">
              <WorkspaceIcon />
            </span>
            <p className="text-center font-semibold">Workspace</p>
          </div>
        </button>
      </div>
      <div className={`col-span-3 bg-blue-200 ${styles["middle"]}`}>B</div>
      <div className={`col-span-8 bg-green-300 ${styles["right"]}`}>C</div>
    </div>
  );
}

export { DashboardLayout };
