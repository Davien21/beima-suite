import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { SearchBox } from "components";
import { motion } from "framer-motion";
import { menuVariants } from "animations";
import styles from "./select.module.css";
import { useClickOutside } from "hooks";
import { getRandomKey } from "utils";

export function Select({
  list,
  children,
  isSearchable,
  onSelect,
}: {
  list: string[];
  children: React.ReactNode;
  toggleIcon?: React.ReactNode;
  isSearchable?: boolean;
  onSelect: (value: string) => void;
}) {
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
  const handleSelect = (value: string) => {
    onSelect(value);
    setisOpen(false);
  };
  const itemRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<any>(null);
  // fix this, its rerendering all the time because it is still in dom.
  useClickOutside(selectRef, () => setisOpen(false), itemRef);

  return (
    <div className={`${styles["container"]} "`}>
      <div className="flex gap-x-4 items-center" ref={itemRef} onClick={toggleOpen}>
        {children}
      </div>
      <motion.div
        ref={selectRef}
        className={`${styles["content"]} ${
          isSearchable ? "p-2" : "pt-0 pb-3 px-2"
        }`}
        initial="exit"
        animate={isOpen ? "enter" : "exit"}
        variants={menuVariants}
      >
        {isSearchable && (
          <SearchBox
            placeholder="Try searching for the item"
            query={query}
            onChange={onSearch}
          />
        )}
        {list.length > 0 && (
          <ul>
            {activeList.map((item: string) => {
              return (
                <li onClick={() => handleSelect(item)} key={getRandomKey()}>
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
