import { PanelVariants } from "animations";
import { ClosePanelIcon } from "assets/images";
import { motion } from "framer-motion";
import { IStore } from "interfaces";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./bottom-panel.module.css";
import { BulbIcon } from "./bulbIcon";

export function BottomPanel() {
  const testContract = useSelector((state: IStore) => state.testContract);
  const hasContracts = !!testContract.name;
  const [isOpen, setIsOpen] = useState<boolean>(true);

  let containerClass = `gap-3 ${styles["container"]}`;
  if (isOpen) containerClass += ` ${styles["active"]}`;

  let closePanelBtnClass = `${styles["close-panel-btn"]} gap-x-3`;
  return (
    <>
      {hasContracts ? (
        <motion.div
          initial="grow"
          animate={isOpen ? "grow" : "shrink"}
          variants={PanelVariants}
          className={containerClass}
        >
          <div className={`${styles["body"]} gap-3`}>
            <BulbIcon isGrown={!isOpen} />
            <p className="grey">Smart contract testing is coming soon</p>
          </div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={closePanelBtnClass}
          >
            <ClosePanelIcon />
            <span className="grey">{isOpen ? "Close" : "Open"} Panel</span>
          </div>
        </motion.div>
      ) : (
        ""
      )}
    </>
  );
}
