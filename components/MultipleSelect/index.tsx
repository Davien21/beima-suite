import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { SearchBox } from "components";
import { motion } from "framer-motion";
import { dropDownVariants } from "animations";
import styles from "./multiple-select.module.css";
import { useClickOutside } from "hooks";
import { getRandomKey } from "utils";
import { CheckboxIcon } from "assets/images";
import { IWithActiveState } from "interfaces";
import { useHover } from "usehooks-ts";

export function MultipleSelect({
  list,
  children,
  isSearchable,
  onSelect,
  shouldLeaveonMouseOut = true,
}: {
  list: IWithActiveState[];
  children: React.ReactNode;
  toggleIcon?: React.ReactNode;
  isSearchable?: boolean;
  onSelect: (value: string) => void;
  shouldLeaveonMouseOut: boolean;
}) {
  useEffect(() => {
    setactiveList(list);
  }, [list]);
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [hasHovered, sethasHovered] = useState<boolean>(false);
  const [hasAnimated, sethasAnimated] = useState<boolean>(false);
  const [activeList, setactiveList] = useState<IWithActiveState[]>(list);
  const toggleOpen = () => setisOpen(!isOpen);
  const [query, setquery] = useState<string>("");
  const onSearch = (e: ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setquery(value);
    const filteredList = list.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
    setactiveList(filteredList);
  };
  const handleSelect = (value: string) => {
    onSelect(value);
    // setisOpen(false);
  };
  const itemRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<any>(null);
  const listRef = useRef<any>(null);
  // fix this, its rerendering all the time because it is still in dom.
  useClickOutside(selectRef, () => setisOpen(false), itemRef);
  const isHovering = useHover(selectRef);
  useEffect(() => {
    if (shouldLeaveonMouseOut && hasAnimated && hasHovered && !isHovering) {
      setisOpen(false);
      sethasHovered(false);
    }
  }, [hasAnimated, hasHovered, isHovering, shouldLeaveonMouseOut]);
  return (
    <div className={`${styles["container"]} "`}>
      <div ref={itemRef} onClick={toggleOpen}>
        {children}
      </div>
      <motion.div
        ref={selectRef}
        className={`${styles["content"]} ${
          isSearchable ? "p-2" : "pt-0 pb-3 px-2"
        }`}
        initial="exit"
        animate={isOpen ? "enter" : "exit"}
        onAnimationComplete={() => {
          sethasAnimated(true);
        }}
        variants={dropDownVariants}
      >
        {isSearchable && (
          <SearchBox
            placeholder="Try searching for the item"
            query={query}
            onChange={onSearch}
          />
        )}
        {list.length > 0 && (
          <ul
            ref={listRef}
            onMouseOver={(e) => {
              sethasHovered(true);
              e.stopPropagation();
            }}
          >
            {activeList.map((item: IWithActiveState) => {
              let className = "flex items-center pl-4 gap-x-3";
              item.isActive && (className += ` ${styles["active"]}`);
              return (
                <li
                  className={className}
                  onClick={() => handleSelect(item.name)}
                  key={getRandomKey()}
                >
                  <CheckboxIcon />
                  <span>{item.name}</span>
                </li>
              );
            })}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
