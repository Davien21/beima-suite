import React, { useEffect, useRef, useState } from "react";
import Markdown from "markdown-to-jsx";

import { CloseIcon } from "assets/images";

import styles from "./function-desc-modal.module.css";
import { Button, TextArea, Switch } from "components";
import { motion } from "framer-motion";
import { ModalParentVariants } from "animations";
import { useSelector, useDispatch } from "react-redux";

import { useKeypress } from "hooks";
import { setIsFunctionDescModalOpen } from "store/slices/modalSlice";
import { IContract, IStore } from "interfaces";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { setFunctionComment } from "store/slices";
import { getCommentFromContract } from "utils/helpers";

const validationSchema = Yup.object({ comment: Yup.string() });
interface IForm {
  comment: string;
}

export function FunctionDescModal() {
  const router = useRouter();
  const contracts = useSelector((state: IStore) => state.contracts);
  const { contractId, itemId } = router.query;
  const functionName = itemId as string;
  const index = contracts.findIndex((x: IContract) => x.id === contractId);

  const comment = getCommentFromContract(contracts[index], functionName);
  const initialValues: IForm = { comment };

  const handleSubmit = (values: IForm) => {
    const { comment } = values;
    dispatch(
      setFunctionComment({
        index,
        functionName,
        comment,
      })
    );
    closeModal();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  const { isFunctionDescModalOpen } = useSelector(
    (state: IStore) => state.modal
  );

  useKeypress("Escape", () => {
    dispatch(setIsFunctionDescModalOpen(false));
  });

  const dispatch = useDispatch();
  const [isShowingMarkdown, setisShowingMarkdown] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalHeight, setmodalHeight] = useState<number>(0);

  const closeModal = () => {
    dispatch(setIsFunctionDescModalOpen(false));
  };

  useEffect(() => {
    if (modalRef.current) setmodalHeight(modalRef.current.clientHeight);

    document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFunctionDescModalOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, display: "none" }}
      animate={isFunctionDescModalOpen ? "enter" : "exit"}
      variants={ModalParentVariants}
      exit={{ opacity: 0, transition: { when: "afterChildren" } }}
      className={`${styles["container"]}`}
      onClick={closeModal}
    >
      <motion.div
        initial={{ y: "-100%" }}
        animate={isFunctionDescModalOpen ? { y: `100px` } : { y: "-100%" }}
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
            <span className="text-lg font-semibold">Function Description</span>
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
                placeholder="Write the description for this function"
                formik={formik}
                name="comment"
              />
            ) : (
              <div className={`${styles["mark-down-container"]}`}>
                <Markdown>{formik.values["comment"]}</Markdown>
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
                <Button type="submit">Save</Button>
                <Button
                  secondary
                  disabled={!formik.dirty || !formik.isValid}
                  onClick={formik.resetForm}
                >
                  Cancel
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
