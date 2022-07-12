import { SearchIcon } from "assets/images";
import { useFocus } from "hooks";
import React, { useEffect, useRef } from "react";
import styles from "./search-box.module.css";

function SearchBox({
  query,
  onChange,
  placeholder,
}: {
  query?: string;
  onChange?: (query: any) => void;
  placeholder: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isFocused = useFocus(inputRef);

  return (
    <form
      onSubmit={onChange}
      className={`w-full ${styles["search-box"]} ${
        isFocused ? styles["active"] : ""
      }`}
    >
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-event s-none">
          <SearchIcon />
        </div>
        <input
          value={query}
          onChange={onChange}
          ref={inputRef}
          type="search"
          className="block px-4 py-2 pl-10 w-full text-sm border border-gray-300 "
          placeholder={placeholder}
        />
      </div>
    </form>
  );
}

export { SearchBox };
