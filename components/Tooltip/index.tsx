import React, { useEffect, useRef, useState } from "react";
import { useHover, useOnClickOutside } from "usehooks-ts";
import { createPopper } from "@popperjs/core";
import styles from "./tooltip.module.css";
interface IProps {
  trigger?: "click" | "hover";
  title: string;
  children: React.ReactNode;
}

export function Tooltip({ trigger, title, children }: IProps) {
  const objectRef = useRef<any>(null);
  const tooltipRef = useRef<any>(null);
  useEffect(() => {
    if (window && document && objectRef.current && tooltipRef.current) {
      createPopper(objectRef.current, tooltipRef.current, {
        placement: "bottom",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 4],
            },
          },
        ],
      });
    }
  });
  if (!trigger) trigger = "hover";
  const isHovering = useHover(objectRef);
  const [isClicked, setisOpen] = useState<boolean>(false);
  const shouldShow = trigger === "click" ? isClicked : isHovering;
  const toggleOpen = () => setisOpen(!isClicked);
  useOnClickOutside(tooltipRef, toggleOpen);
  return (
    <div>
      <div
        onClick={trigger === "click" ? toggleOpen : () => {}}
        ref={objectRef}
      >
        {children}
      </div>
      {shouldShow && (
        <div className="" ref={tooltipRef}>
          <div className={`${styles["arrow"]}`}></div>
          <div className={`${styles["tooltip"]} px-4 py-2`}>{title}</div>
        </div>
      )}
    </div>
  );
}
