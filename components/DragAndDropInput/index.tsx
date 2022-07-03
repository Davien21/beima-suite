import React, { SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BigUploadIcon } from "../../assets/images";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import styles from "./drag-and-drop-input.module.css";
import { FormikProps } from "formik";
import { filterContract } from "../../utils";
import { IContractData } from "../../contexts/appContext";

type FileTypes = "json" | "sol";
interface IProps {
  name: string;
  type: FileTypes;
  maxSize?: number;
  labelMessage?: string;
  formik?: FormikProps<any>;
  onFileChange?: (data?: any) => void;
}

export function DragAndDropInput({
  name,
  type,
  maxSize,
  labelMessage,
  formik,
  onFileChange,
}: IProps) {
  const { isDraggingOver, setIsDraggingOver, onDragOver, onDragLeave } =
    useDragAndDrop();

  const handleFileInput = (file: File) => {
    console.log(file);
    if (file.type !== type && !file.type && !file.name.includes(type))
      return toast.error(`Expected .${type} file`);
    if ((maxSize && file.size > maxSize) || (!maxSize && file.size > 10000000))
      return toast.error("File is too big!");

    if (onFileChange) onFileChange(file);
    if (formik) formik.setFieldValue(name, file);
  };
  const onDrop = (e: any) => {
    e.preventDefault();

    setIsDraggingOver(false);

    const file = e?.dataTransfer?.files[0];

    handleFileInput(file);
  };

  const fileSelect = (e: any) => {
    let file = e?.currentTarget?.files[0];

    handleFileInput(file);
  };

  let containerClass = `${styles["container"]}`;
  if (isDraggingOver) containerClass += ` ${styles["active"]}`;

  useEffect(() => {
    // console.log(formik.values);
  }, [formik]);

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={containerClass}
    >
      <label>
        <input
          accept=".sol"
          type="file"
          name={name}
          id={name}
          className="hidden"
          onChange={fileSelect}
        />
        <BigUploadIcon />
        <p className="text-sm mt-3">
          {labelMessage || `Drag and drop or choose your file to upload.`}
        </p>
      </label>
    </div>
  );
}
