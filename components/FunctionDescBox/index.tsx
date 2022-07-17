import React, { useState } from "react";
import { UpIcon } from "assets/images";
import styles from "./function-desc-box.module.css";
import { motion } from "framer-motion";

export function FunctionDescBox({ comment }: { comment: string }) {
  let commentClass = `${styles["comment"]}`;
  const [isOpen, setisOpen] = useState<boolean>(true);
  const toggleOpen = () => setisOpen(!isOpen);
  return (
    <div onClick={toggleOpen} className={`${styles["container"]} px-5 py-4`}>
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
      <motion.p
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        exit="closed"
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 },
        }}
        className={`${commentClass} pt-1`}
      >
        {comment ? (
          <span>{comment}</span>
        ) : (
          <span className="grey">
            You have not added a description for this function yet. Click the
            Description button to add one.
          </span>
        )}
      </motion.p>
    </div>
  );
}
