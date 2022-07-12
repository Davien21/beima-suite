import { UpIcon } from "assets/images";
import React, { ChangeEvent, useState } from "react";
import { SearchBox } from "components";
import { motion } from "framer-motion";
import { menuVariants } from "animations";

export function Select({
  children,
  toggleIcon,
  isSearchable,
}: {
  children: React.ReactNode;
  toggleIcon?: React.ReactNode;
  isSearchable?: boolean;
}) {
  const list = [
    "Australia",
    "Columbia",
    "Denmark",
    "Germany",
    "Indonesia",
    "Nigeria",
    "Belgium",
    "Rome",
    "Greece",
    "Iceland",
  ];
  const arrowVariants = {
    open: { rotate: 0 },
    closed: { rotate: 180 },
  };

  const initialAnimation = { rotate: 180, transition: { duration: 0 } };
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
  return (
    <div className="wrapper relative">
      <div onClick={toggleOpen}>{children}</div>
      <motion.div
        className={`content ${isSearchable ? "p-2" : "pt-0 pb-3 px-2"}`}
        initial="exit"
        animate={isOpen ? "enter" : "exit"}
        variants={menuVariants}
      >
        {isSearchable && <SearchBox query={query} onChange={onSearch} />}

        <ul className="options">
          {activeList.map((item: string) => {
            return (
              <li tabIndex={0} className="li" key={item}>
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
