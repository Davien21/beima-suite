import React, { useRef, useState } from "react";
import { useHover } from "usehooks-ts";
import styles from "./tooltip.module.css";
import { useClickOutside, usePopper } from "hooks";
interface IProps {
  trigger?: "click" | "hover";
  title: string;
  placement?: "top" | "bottom";
  children: React.ReactNode;
}

export function Tooltip({ trigger, title, children, placement }: IProps) {
  if (!placement) placement = "top";
  const objectRef = useRef<any>(null);
  const tooltipRef = useRef<any>(null);
  usePopper(objectRef, tooltipRef, placement);

  if (!trigger) trigger = "hover";
  const isHovering = useHover(objectRef);
  const [isClicked, setisOpen] = useState<boolean>(false);
  const shouldShow = trigger === "click" ? isClicked : isHovering;
  const toggleOpen = () => setisOpen(!isClicked);
  useClickOutside(tooltipRef, toggleOpen, objectRef);

  return (
    <div>
      <div
        className="inline-flex"
        onClick={trigger === "click" ? toggleOpen : () => {}}
        ref={objectRef}
      >
        {children}
      </div>
      {shouldShow && title ? (
        <div className={`${styles[placement]} `} ref={tooltipRef}>
          <div className={`${styles["arrow"]} `}></div>
          <div className={`${styles["tooltip"]} px-4 py-2`}>{title}</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
