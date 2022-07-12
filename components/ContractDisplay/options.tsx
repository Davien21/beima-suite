import { EditIcon, OptionDotsIcon, PublishIcon, UpIcon } from "assets/images";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePopper } from "react-popper";
import { useClickOutside } from "hooks";
import { arrowVariants, menuVariants } from "animations";
import Pstyles from "./contract-display.module.css";

export function ContractOptions() {
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<any>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "right-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 5],
        },
      },
    ],
  });
  const optionsRef = useRef<any>(null);
  const dropDownArrowRef = useRef<any>(null);
  const [isOpen, setisOpen] = useState<boolean>(false);

  const toggleOpen = () => setisOpen(!isOpen);

  useClickOutside(optionsRef, toggleOpen, dropDownArrowRef);

  const onItemFocus = (e: FocusEvent) => {
    console.log(e.target);
  };

  const initialAnimation = { rotate: 180, transition: { duration: 0 } };

  return (
    <div className="flex" ref={setReferenceElement}>
      <motion.span
        className={`p-3 cursor-pointer ${Pstyles["toggler"]}`}
        initial={initialAnimation}
        animate={isOpen ? "open" : "closed"}
        variants={arrowVariants}
        onClick={(e) => {
          toggleOpen();
          e.stopPropagation();
        }}
        ref={dropDownArrowRef}
      >
        <OptionDotsIcon />
      </motion.span>
      {isOpen && (
        <div className="" ref={optionsRef}>
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className={`${Pstyles["options"]}`}
          >
            <motion.div
              initial="exit"
              animate={isOpen ? "enter" : "exit"}
              variants={menuVariants}
            >
              <ul className="options" onClick={(e) => e.stopPropagation()}>
                <li className="p-4" onClick={toggleOpen}>
                  <span className="flex items-center gap-x-2">
                    <span>
                      <PublishIcon />
                    </span>
                    <span>Publish Documentation</span>
                  </span>
                </li>
                <li className="p-4" onClick={toggleOpen}>
                  <span className="flex items-center gap-x-2">
                    <span>
                      <EditIcon />
                    </span>
                    <span>Edit Details</span>
                  </span>
                </li>
                <li className="p-4" onClick={toggleOpen}>
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
