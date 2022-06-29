import React, { SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BigUploadIcon } from "../../assets/images";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import styles from "./drag-and-drop-input.module.css";
import { FormikProps } from "formik";

function DragAndDropInput({
  name,
  formik,
}: {
  name: string;
  formik: FormikProps<any>;
}) {
  const { isDraggingOver, setIsDraggingOver, onDragOver, onDragLeave } =
    useDragAndDrop();

  const [solFunctions, setsolFunctions] = useState<String[]>([]);

  const handleFileInput = (file: File) => {
    if (!file.name.includes(".sol"))
      return toast.error("File must be a Solidity File!");
    if (file.size > 10000000)
      return toast.error("File must be less than 10MB!");

    var fileBlob = new Blob([file]);

    (async () => {
      const content = await fileBlob.text();

      // console.log({ content });
      const regex = /(\b(?=\w)function \w+\(?.+\))/gim;
      const parsed = content.split(regex);
      const functions = parsed.filter((a) => a.match(regex));
      setsolFunctions(functions);
      console.log(functions);
    })();

    // formik.setFieldValue("file", file);
    if (file) {
      const url = URL.createObjectURL(file);
    }
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
          Only Solidity Files are allowed. Max 10mb.
        </p>
      </label>
      {solFunctions.length > 0 && (
        <>
          <p className={`mt-7 mb-4 font-coolvetica text-lg`}>
            Native Functions:
          </p>
          <ul className="bg-white rounded-lg border border-gray-200 w-full text-gray-900">
            {solFunctions.map((func, index) => {
              if (index === solFunctions.length - 1)
                return (
                  <li key={index} className="px-6 py-2 w-full rounded-b-lg">
                    {index + 1}. {func}
                  </li>
                );
              return (
                <li
                  key={index}
                  className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                >
                  {index + 1}. {func}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default DragAndDropInput;
