import React, { useCallback, useEffect, useRef, useState } from "react";
import Markdown from "markdown-to-jsx";

import { CloseIcon } from "assets/images";

import styles from "./item-desc-modal.module.css";
import { Button, TextArea, Switch } from "components";
import { motion } from "framer-motion";
import { ModalParentVariants } from "animations";
import { useSelector, useDispatch } from "react-redux";

import { useModal } from "hooks";
import { setIsItemDescModalOpen } from "store/slices/modalSlice";
import { IContract, IItem, IQuery, IStore } from "interfaces";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setItemDescription } from "store/slices/testContractSlice";
import { capitalize, deepClone, errorMessage } from "utils/helpers";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { updateContract, updateContractItem } from "services/contractsService";
import { useLocalStorage } from "usehooks-ts";
import { toast } from "react-toastify";
import { useGetContracts } from "hooks/apis/useGetContracts";
import { useGetItem } from "hooks/apis";
import { setContracts } from "store/slices/contractSlice";

const validationSchema = Yup.object({ description: Yup.string() });
interface IForm {
  description: string;
}

export function ItemDescModal({ item }: { item: IItem }) {
  let router = useRouter();
  let { contractId, itemId } = router.query as IQuery;
  const dispatch = useDispatch();

  const { user } = useSelector((state: IStore) => state.auth);
  let { data: itemData, mutate } = useGetItem({ contractId, itemId });
  // const contract = contracts.find((c) => c._id === contractId);

  const isLoggedIn = !!user.firstName;
  const { _id, description } = item;
  const initialValues: IForm = { description };
  const { activeControl } = useSelector((state: IStore) => state.filters);
  const closeModal = () => {
    dispatch(setIsItemDescModalOpen(false));
  };
  const [authToken, setJwt] = useLocalStorage("beima-auth-token", "");

  // const { data, mutate } = useGetItem({ contractId, itemId });

  const [isLoading, setisLoading] = useState(false);
  const handleSubmit = async (values: IForm) => {
    const { description } = values;
    const update = { _id, description };
    if (!isLoggedIn) {
      // console.log(isLoggedIn)
      dispatch(setItemDescription(update));
    } else if (isLoggedIn) {
      let newItem = { ...itemData, description };
      const options = { optimisticData: newItem, rollbackOnError: true };
      mutate(async () => {
        const { error } = await updateContractItem(
          contractId,
          update,
          authToken
        );
        if (error) return toast.error("Error updating this description");
        return newItem;
      }, options);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    // formik.values["description"] = description;
  }, [description, formik.values]);

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
                <Button isLoading={false} type="submit">
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
