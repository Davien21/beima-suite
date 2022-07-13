import React from "react";
import { toast } from "react-toastify";
import { FormikProps } from "formik";
import { motion } from "framer-motion";

import { AltFilesIcon, CircleCloseIcon } from "assets/images";
import { useDragAndDrop } from "hooks";
import styles from "./drag-and-drop-input.module.css";
import { formatFileSize } from "utils";

type FileTypes = "json" | "sol";
interface IProps {
  file: File | null;
  setFile: (file: File | null) => void;
  name: string;
  type: FileTypes;
  maxSize?: number;
  labelMessage?: string;
  formik?: FormikProps<any>;
  onFileChange?: (file: File) => void;
  onRemove?: () => void;
}

const isValidFile = (file: File, type: FileTypes) => {
  if (!file) return true;
  if (file.type && file.type.includes(type)) return true;
  if (!file.type && file.name.includes(type)) return true;
  return false;
};

const isValidSize = (file: File, maxSize: number | undefined) => {
  if (maxSize && file.size > maxSize) return false;
  if (!maxSize && file.size > 10000000) return false;
  return true;
};

const validTypes = ["json", "sol"];

export function DragAndDropInput({
  file,
  setFile,
  name,
  type,
  maxSize,
  labelMessage,
  formik,
  onFileChange,
  onRemove,
}: IProps) {
  const { isDraggingOver, setIsDraggingOver, onDragOver, onDragLeave } =
    useDragAndDrop();

  const handleFileInput = (file: File) => {
    if (!file) return;
    if (!isValidFile(file, type)) return toast.error(`Expected .${type} file`);
    if (!isValidSize(file, maxSize)) return toast.error("File is too big!");
    setFile(file);
    if (onFileChange) onFileChange(file);
    if (formik) formik.setFieldValue(name, file);
  };

  const removeFile = () => {
    setFile(null);
    if (onRemove) onRemove();
    if (formik) formik.setFieldValue(name, null);
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

  let dropBoxClass = `${styles["drop-box"]}`;
  if (isDraggingOver || file) dropBoxClass += ` ${styles["active"]}`;

  return (
    <>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={dropBoxClass}
      >
        <label className="py-6 px-5 block">
          <input
            accept={`.${type}`}
            type="file"
            name={name}
            id={name}
            className="hidden"
            onChange={fileSelect}
          />

          <span className="flex justify-center mb-4">
            <AltFilesIcon />
          </span>
          <span className="text-center block">
            {labelMessage || `Drop files here to upload your document`}
          </span>
        </label>
      </div>
      {file && (
        <div
          className={`${styles["file-box"]} mt-5 py-4 px-5 flex items-center justify-between`}
        >
          <span className="flex justify-center text-sm font-semibold">
            {file.name}
          </span>
          <div className="flex items-center gap-x-5">
            <span className="text-center text-sm grey font-medium">
              {formatFileSize(file.size)}
            </span>
            <motion.span
              whileHover={{ scale: 1.2 }}
              className="text-center cursor-pointer"
              onClick={removeFile}
            >
              <CircleCloseIcon />
            </motion.span>
          </div>
        </div>
      )}
    </>
  );
}
