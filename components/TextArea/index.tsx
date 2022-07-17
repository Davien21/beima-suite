import React, { useState, SyntheticEvent } from "react";
import styles from "./textarea.module.css";
import { FormikProps } from "formik";

type InputType = {
  onClick?: () => void;
  label?: string;
  className?: string;
  id?: string;
  name: string;
  formik: FormikProps<any>;
  placeholder?: string | "";
  rows?: number;
};

function TextArea({
  label,
  id,
  name,
  formik,
  rows = 8,
  className,
  ...rest
}: InputType) {
  // State management
  const [isFocused, setIsFocused] = useState(false);

  const error = formik.touched[name] && formik.errors?.[name];
  let classes = `${styles.container} ${className ? className : ""} `;
  let placeholder = rest.placeholder;

  // Handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formik) formik?.handleChange(e);
  };

  if (error) classes += styles["error"];

  if (formik) {
    Object.assign(rest, {
      onChange: handleChange,
      onBlur: (e: SyntheticEvent) => {
        setIsFocused(false);
        return formik?.handleBlur(e);
      },
      value: formik?.values[name],
    });
  }

  return (
    <div className={classes}>
      {label && (
        <label
          className={isFocused ? `${styles["active"]}` : ""}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <textarea
        id={id ?? name}
        name={name}
        onFocus={() => setIsFocused(true)}
        {...rest}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
}

export { TextArea };
