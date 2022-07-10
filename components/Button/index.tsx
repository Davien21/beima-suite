import React from "react";
import styles from "./button.module.css";
import { toast } from "react-toastify";

function Button({
  disabled,
  secondary,
  children,
  className,
  onClick,
  type,
  ...rest
}: {
  disabled?: boolean;
  secondary?: any;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  rest?: any;
}) {
  let containerClass = styles.container;
  let form = "primary";
  if (secondary !== undefined) form = `secondary`;
  if (containerClass) containerClass += ` ${styles[form]} ${className}`;
  if (!type) type = "button";
  return (
    <button
      type={type}
      onClick={onClick}
      className={containerClass}
      {...rest}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export { Button };
