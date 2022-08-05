import React, { useEffect, useRef, useState } from "react";
import Markdown from "markdown-to-jsx";

import { CloseIcon } from "assets/images";

import styles from "./contract-desc-modal.module.css";
import { Button, TextArea, Switch } from "components";
import { motion } from "framer-motion";
import { ModalParentVariants } from "animations";
import { useSelector, useDispatch } from "react-redux";

import { useModal } from "hooks";
import { setIsContractDescModalOpen } from "store/slices/modalSlice";
import { IContract, IStore } from "interfaces";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { setTestContractDesc } from "store/slices/testContractSlice";
import { useGetContracts } from "hooks/apis/useGetContracts";
import { updateContract } from "services/contractsService";
import { deepClone } from "utils/helpers";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";
import { toast } from "react-toastify";

const validationSchema = Yup.object({ description: Yup.string() });
interface IForm {
  description: string;
}

export function ContractDescModal() {
  const { openedOptionId: contractId } = useSelector(
    (state: IStore) => state.UIState
  );
  const { user } = useSelector((state: IStore) => state.auth);
  const isLoggedIn = !!user.firstName;

  const testContract = useSelector((state: IStore) => state.testContract);
  const { data: contracts, mutate } = useGetContracts();

  const [authToken, setJwt] = useLocalStorage("beima-auth-token", "");
  const [description, setdescription] = useState(testContract.description);
  const initialValues: IForm = { description };

  const handleSubmit = (values: IForm) => {
    const { description } = values;
    let update = { _id: contractId, description };
    if (!isLoggedIn) {
      dispatch(setTestContractDesc(description));
    } else {
      let contractIndex = contracts.findIndex((c) => c._id === contractId);
      let contract = deepClone(contracts[contractIndex]);
      let newContract = { ...contract, description };
      let newContracts = deepClone(contracts);
      newContracts[contractIndex] = newContract;
      const options = { optimisticData: newContracts, rollbackOnError: true };
      mutate(async () => {
        const { error } = await updateContract(update, authToken);
        if (error) return toast.error("Error updating this description");
        return newContracts;
      }, options);
    }
    closeModal();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!!!contracts.length) return;
    const desc = contracts.find((c) => c._id === contractId)?.description || "";
    formik.initialValues.description = desc;
  }, [contracts, formik.initialValues, contractId]);

  const closeModal = () => {
    dispatch(setIsContractDescModalOpen(false));
  };

  const { isContractDescModalOpen } = useSelector(
    (state: IStore) => state.modal
  );

  const dispatch = useDispatch();
  const [isShowingMarkdown, setisShowingMarkdown] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useModal(isContractDescModalOpen, modalRef, closeModal);
  return (
    <motion.div
      initial={{ opacity: 0, display: "none" }}
      animate={isContractDescModalOpen ? "enter" : "exit"}
      variants={ModalParentVariants}
      exit={{ opacity: 0, transition: { when: "afterChildren" } }}
      className={`${styles["container"]}`}
      onClick={closeModal}
    >
      <motion.div
        initial={{ y: "-100%" }}
        animate={isContractDescModalOpen ? { y: `100px` } : { y: "-100%" }}
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
            <span className="text-lg font-semibold">Contract Description</span>
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
                placeholder="Write the description for this contract"
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
                    // !formik.dirty ||
                    // !formik.isValid ||
                    !formik.touched["description"]
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
