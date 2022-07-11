import { UpIcon } from "assets/images";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { SearchBox } from "components";
import { motion } from "framer-motion";
import { createPopper } from "@popperjs/core";
import { usePopper } from "react-popper";
import { useOnClickOutside } from "usehooks-ts";
import { useClickOutside } from "hooks";
import { arrowVariants, list, menuVariants } from "./meta";

export function Select({
  list,
  children,
  toggleIcon,
  isSearchable,
}: {
  list: string[];
  children: React.ReactNode;
  toggleIcon?: React.ReactNode;
  isSearchable?: boolean;
}) {
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<any>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "right-start",
  });
  const popcornRef = useRef<any>(null);
  const dropDownArrowRef = useRef<any>(null);
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [activeList, setactiveList] = useState<string[]>(list);

  const toggleOpen = () => setisOpen(!isOpen);
  const [query, setquery] = useState<string>("");
  const onSearch = (e: ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setquery(value);
    const filteredList = list.filter((item) => {
      return item.toLowerCase().includes(value.toLowerCase());
    });
    setactiveList(filteredList);
  };
  useClickOutside(popcornRef, toggleOpen, dropDownArrowRef);

  const onItemFocus = (e: FocusEvent) => {
    console.log(e.target);
  };

  const initialAnimation = { rotate: 180, transition: { duration: 0 } };

  return (
    <div className="flex" ref={setReferenceElement}>
      {children}
      <motion.span
        className="p-3 cursor-pointer toggler"
        initial={initialAnimation}
        animate={isOpen ? "open" : "closed"}
        variants={arrowVariants}
        onClick={toggleOpen}
        ref={dropDownArrowRef}
      >
        {toggleIcon || <UpIcon />}
      </motion.span>
      {isOpen ? (
        <div className="wrapper" ref={popcornRef}>
          {/* <div className="toggler-container " ref={setReferenceElement}></div> */}
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className={`content ${isSearchable ? "p-2" : "pt-0 pb-3 px-2"}`}
            // initial="exit"
            // animate={isOpen ? "enter" : "exit"}
            // variants={menuVariants}
          >
            <motion.div
              initial="exit"
              animate={isOpen ? "enter" : "exit"}
              variants={menuVariants}
            >
              {isSearchable && <SearchBox query={query} onChange={onSearch} />}

              <ul className="options">
                {activeList.map((item: string) => {
                  return (
                    <li
                      onClick={() => {
                        setactiveList([...activeList, "aaa"]);
                      }}
                      tabIndex={0}
                      className="li"
                      key={item}
                      onFocus={() => {}}
                    >
                      <span>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
