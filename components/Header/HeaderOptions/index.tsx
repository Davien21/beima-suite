import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useClickOutside, usePopper } from "hooks";
import { menuVariants } from "animations";
import styles from "./header-options.module.css";
import { useDispatch } from "react-redux";
import { triggerLogout } from "store/slices/authSlice";
import { useLocalStorage } from "usehooks-ts";

export function HeaderOptions({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  const optionsMenuRef = useRef<any>(null);
  const objectRef = useRef<any>(null);

  usePopper(objectRef, optionsMenuRef, "header-options");

  const [isOpen, setisOpen] = useState<boolean>(false);

  const closeMenu = () => setisOpen(false);
  const toggleMenu = () => setisOpen(!isOpen);
  const [jwt, setJwt] = useLocalStorage("beima-auth-token", "");
  const logout = () => {
    dispatch(triggerLogout());
    setJwt("");
    closeMenu();
  };

  useClickOutside(optionsMenuRef, closeMenu, objectRef);

  return (
    <div className="flex" ref={objectRef}>
      <div className="cursor-pointer" onClick={toggleMenu} ref={objectRef}>
        {children}
      </div>
      {isOpen && (
        <div className="" ref={optionsMenuRef}>
          <div className={`${styles["options"]}`}>
            <motion.div
              initial="exit"
              animate={isOpen ? "enter" : "exit"}
              variants={menuVariants}
            >
              <ul className="options" onClick={(e) => e.stopPropagation()}>
                <li className="px-4 py-2" onClick={logout}>
                  <span className="flex items-center gap-x-2">
                    <span>Logout</span>
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
