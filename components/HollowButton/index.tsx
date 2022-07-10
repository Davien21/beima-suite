import React from "react";
import styles from "./hollow-button.module.css";
import { toast } from "react-toastify";

function HollowButton({
  children,
  className,
  onClick,
  type,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  rest?: any;
}) {
  // onClick = () => toast.info("This is coming soon!");
  let containerClass = styles.container;
  if (containerClass) containerClass += ` ${className}`;
  if (!type) type = "button";
  return (
    <button type={type} onClick={onClick} className={containerClass}>
      {children}
    </button>
  );
}

export { HollowButton };
