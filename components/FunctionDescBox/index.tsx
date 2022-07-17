import React, { useState } from "react";
import Markdown from "markdown-to-jsx";

import { UpIcon } from "assets/images";
import styles from "./function-desc-box.module.css";
import { motion } from "framer-motion";
import { ITypes } from "interfaces";
import { accordionVariants } from "animations";

export function FunctionDescBox({
  comment,
  type,
}: {
  comment: string;
  type: ITypes;
}) {
  const [isOpen, setisOpen] = useState<boolean>(true);

  let commentClass = `${styles["comment"]} `;
  if (isOpen) commentClass += `cursor-auto`;

  let containerClass = `${styles["container"]}`;
  if (isOpen) containerClass += ` ${styles["active"]}`;

  const toggleOpen = () => setisOpen(!isOpen);
  return (
    <div onClick={toggleOpen} className={`${containerClass} px-5 py-4`}>
      <div className="flex items-center justify-between">
        <h4 className="font-bold">Description</h4>
        <motion.div
          animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          onClick={toggleOpen}
          className={`${styles["up-icon"]}`}
        >
          <span>
            <UpIcon />
          </span>
        </motion.div>
      </div>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        exit="closed"
        variants={accordionVariants}
        className={`${commentClass}`}
      >
        {comment ? (
          <div className={`${styles["mark-down-container"]}`}>
            <Markdown>{comment}</Markdown>
          </div>
        ) : (
          <span className="grey">
            You have not added a description for this {type} yet. Click the
            Description button to add one.
          </span>
        )}
      </motion.div>
    </div>
  );
}
