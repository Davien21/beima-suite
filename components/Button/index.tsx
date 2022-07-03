import React from "react";
import styles from "./button.module.css";
import { toast } from "react-toastify";

function Button({
  secondary,
  children,
  className,
  onClick,
  type,
  ...rest
}: {
  secondary?: any;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  rest?: any;
}) {
  onClick = () => toast.info("This is coming soon!");
  let containerClass = styles.container;
  let form = "primary";
  if (secondary !== undefined) form = `secondary`;
  if (containerClass) containerClass += ` ${styles[form]} btn ${className}`;
  if (!type) type = "button";
  return (
    <button type={type} onClick={onClick} className={containerClass} {...rest}>
      {children}
    </button>
  );
}

export { Button };
