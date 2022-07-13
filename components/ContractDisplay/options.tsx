import { EditIcon, OptionDotsIcon, PublishIcon } from "assets/images";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useClickOutside, usePopper } from "hooks";
import { arrowVariants, menuVariants } from "animations";
import Pstyles from "./contract-display.module.css";

export function ContractOptions() {
  const optionsMenuRef = useRef<any>(null);
  const objectRef = useRef<any>(null);
  const dropDownArrowRef = useRef<any>(null);

  usePopper(objectRef, optionsMenuRef, "right-start");

  const [isOpen, setisOpen] = useState<boolean>(false);

  const closeMenu = () => setisOpen(false);

  useClickOutside(optionsMenuRef, closeMenu, dropDownArrowRef);

  const initialAnimation = { rotate: 180, transition: { duration: 0 } };

  return (
    <div className="flex" ref={objectRef}>
      <motion.span
        className={`p-3 cursor-pointer ${Pstyles["toggler"]}`}
        initial={initialAnimation}
        animate={isOpen ? "open" : "closed"}
        variants={arrowVariants}
        onClick={(e) => {
          closeMenu();
          e.stopPropagation();
        }}
        ref={dropDownArrowRef}
      >
        <OptionDotsIcon />
      </motion.span>
      {isOpen && (
        <div className="" ref={optionsMenuRef}>
          <div className={`${Pstyles["options"]}`}>
            <motion.div
              initial="exit"
              animate={isOpen ? "enter" : "exit"}
              variants={menuVariants}
            >
              <ul className="options" onClick={(e) => e.stopPropagation()}>
                <li className="p-4" onClick={closeMenu}>
                  <span className="flex items-center gap-x-2">
                    <span>
                      <PublishIcon />
                    </span>
                    <span>Publish Documentation</span>
                  </span>
                </li>
                <li className="p-4" onClick={closeMenu}>
                  <span className="flex items-center gap-x-2">
                    <span>
                      <EditIcon />
                    </span>
                    <span>Edit Details</span>
                  </span>
                </li>
                <li className="p-4" onClick={closeMenu}>
                  <span className="flex items-center gap-x-2">
                    <span>
                      <PublishIcon />
                    </span>
                    <span>Preview Documentation</span>
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
