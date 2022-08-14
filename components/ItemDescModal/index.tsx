import React, { useEffect, useRef, useState } from "react";
import Markdown from "markdown-to-jsx";

import { CloseIcon } from "assets/images";

import styles from "./item-desc-modal.module.css";
import { Button, TextArea, Switch } from "components";
import { motion } from "framer-motion";
import { ModalParentVariants } from "animations";
import { useSelector, useDispatch } from "react-redux";

import { useModal, usePropsForItem } from "hooks";
import { setIsItemDescModalOpen } from "store/slices/modalSlice";
import { IStore } from "interfaces";
import { useFormik } from "formik";
import * as Yup from "yup";
import { capitalize } from "utils/helpers";

const validationSchema = Yup.object({ description: Yup.string() });
interface IForm {
  description: string;
}

export function ItemDescModal() {
  const { item, setDescription } = usePropsForItem();
  const dispatch = useDispatch();

  const { _id, description } = item;
  const initialValues: IForm = { description };
  const { activeControl } = useSelector((state: IStore) => state.filters);
  const [lastDesc, setlastDesc] = useState(description);
  const closeModal = () => {
    dispatch(setIsItemDescModalOpen(false));
  };

  const handleSubmit = async (values: IForm) => {
    const { description } = values;
    const update = { _id, description };
    setDescription(update);
    closeModal();
    setlastDesc(description);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    formik.initialValues["description"] = description;
  }, [description, formik.initialValues]);

  const { isItemDescModalOpen } = useSelector((state: IStore) => state.modal);

  const [isShowingMarkdown, setisShowingMarkdown] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useModal(isItemDescModalOpen, modalRef, closeModal);

  return (
    <motion.div
      initial={{ opacity: 0, display: "none" }}
      animate={isItemDescModalOpen ? "enter" : "exit"}
      variants={ModalParentVariants}
      exit={{ opacity: 0, transition: { when: "afterChildren" } }}
      className={`${styles["container"]}`}
      onClick={closeModal}
    >
      <motion.div
        initial={{ y: "-100%" }}
        animate={isItemDescModalOpen ? { y: `100px` } : { y: "-100%" }}
        exit={{ y: "-100%" }}
        ref={modalRef}
        className={`${styles["modal-body"]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="px-8 pt-8 lg:px-8 lg:pt-8"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">
              {capitalize(activeControl)} Description
            </span>
            <motion.span
              className="cursor-pointer"
              whileHover={{ scale: 1.5 }}
              onClick={closeModal}
            >
              <CloseIcon />
            </motion.span>
          </div>
          <div className="py-12 px-6">
            {!isShowingMarkdown ? (
              <TextArea
                placeholder={`Write the description for this ${activeControl}`}
                formik={formik}
                name="description"
              />
            ) : (
              <div className={`${styles["mark-down-container"]}`}>
                <Markdown>{formik.values["description"]}</Markdown>
              </div>
            )}

            <div
              className="flex gap-x-1 text-sm mb-8"
              style={{ color: "#828282", fontSize: "15px" }}
            >
              <span className="font-semibold">Markdown</span>
              <span>supported</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-x-2">
                <Button
                  disabled={
                    formik.values["description"] === lastDesc || !formik.isValid
                  }
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  secondary
                  disabled={!formik.dirty || !formik.isValid}
                  onClick={formik.resetForm}
                >
                  Reset
                </Button>
              </div>
              <Switch
                checked={isShowingMarkdown}
                label="Markdown"
                setChecked={setisShowingMarkdown}
              />
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
