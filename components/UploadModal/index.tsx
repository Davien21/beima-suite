import React, { useEffect, useRef } from "react";
import { CloseIcon } from "assets/images";

import styles from "./upload-modal.module.css";
import { Button } from "components";
import { motion } from "framer-motion";
import UploadTabs from "./Tabs";
import { ModalParentVariants } from "animations";
import { useSelector, useDispatch } from "react-redux";
import {
  activateABITab,
  resetUploadState,
  setDocumentation,
} from "store/slices/uploadSlice";
import { useModal, usePropsForContract } from "hooks";
import { setIsUploadModalOpen } from "store/slices/modalSlice";
import { IStore } from "interfaces";

export function UploadModal() {
  const { isUploadModalOpen } = useSelector((state: IStore) => state.modal);
  const { documentation } = useSelector((state: IStore) => state.upload);
  const closeModal = () => {
    dispatch(setIsUploadModalOpen(false));
  };
  const { addContract } = usePropsForContract();

  const { activeTab, contractData, abiFile } = useSelector(
    (state: any) => state.upload
  );
  const dispatch = useDispatch();
  const canGoNext = contractData;
  const canGoContinue = abiFile;
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (documentation) {
      addContract(documentation);
    }
  }, [addContract, documentation]);

  useModal(isUploadModalOpen, modalRef, closeModal);

  return (
    <motion.div
      initial={{ opacity: 0, display: "none" }}
      animate={isUploadModalOpen ? "enter" : "exit"}
      variants={ModalParentVariants}
      exit={{ opacity: 0, transition: { when: "afterChildren" } }}
      className={`${styles["container"]}`}
      onClick={closeModal}
    >
      <motion.div
        initial={{ y: "-100%" }}
        animate={isUploadModalOpen ? { y: `100px` } : { y: "-100%" }}
        exit={{ y: "-100%" }}
        ref={modalRef}
        className={`${styles["modal-body"]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-8 pt-8 lg:px-8 lg:pt-8">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">Import File</span>
            <motion.span
              className="cursor-pointer"
              whileHover={{ scale: 1.5 }}
              onClick={closeModal}
            >
              <CloseIcon />
            </motion.span>
          </div>
          <UploadTabs />
        </div>
        <hr className="my-0" />
        <div className="py-8 px-8 flex gap-x-3">
          {activeTab === "contract" && (
            <Button
              disabled={!canGoNext}
              onClick={() => dispatch(activateABITab())}
            >
              Next
            </Button>
          )}
          {activeTab === "abi" && (
            <Button
              disabled={!canGoContinue}
              onClick={() => {
                dispatch(setDocumentation());
                // console.log(state.documentation);
                closeModal();
              }}
            >
              Continue
            </Button>
          )}

          <Button
            secondary
            onClick={() => {
              dispatch(resetUploadState());
              // closeModal();
            }}
          >
            Cancel
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
