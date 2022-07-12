import React, { ChangeEvent, useRef, useState } from "react";
import { SearchBox } from "components";
import { motion } from "framer-motion";
import { menuVariants } from "animations";
import styles from "./select.module.css";
import { useClickOutside } from "hooks";

export function Select({
  list,
  children,
  isSearchable,
}: {
  list: string[];
  children: React.ReactNode;
  toggleIcon?: React.ReactNode;
  isSearchable?: boolean;
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
  const itemRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<any>(null);
  useClickOutside(selectRef, toggleOpen, itemRef);

  return (
    <div className={`${styles["container"]} "`}>
      <div ref={itemRef} onClick={toggleOpen}>
        {children}
      </div>
      <motion.div
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

        <ul ref={selectRef}>
          {activeList.map((item: string) => {
            return (
              <li key={item}>
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
