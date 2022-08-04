import React, { useEffect, useRef, useState } from "react";
import Emitter from "services/emitter";
import styles from "./action-modal.module.css";

import {
  CloseIcon,
  DangerIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from "assets/images";

import { Button } from "components";
import { motion } from "framer-motion";
import { ModalParentVariants } from "animations";

import { useModal } from "hooks";

interface IArgs {
  title: string;
  content: string;
  btnText?: string;
  type: "success" | "warning" | "info";
  onAction: Function;
}

const Icon = {
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
};

export function ActionModal() {
  const [isOpen, setisOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [args, setargs] = useState<IArgs>({
    title: "Enjoying Beima?",
    content: "No actions made.",
    btnText: "",
    type: "success",
    onAction: () => {},
  });
  const closeModal = () => {
    setisOpen(false);
  };

  useEffect(() => {
    Emitter.on("OPEN_ACTION_MODAL", (args: IArgs) => {
      setargs(args);
      setisOpen(true);
    });
    Emitter.on("CLOSE_ACTION_MODAL", () => setisOpen(false));

    return () => {
      Emitter.off("OPEN_ACTION_MODAL", () => setisOpen(false));
      Emitter.off("CLOSE_ACTION_MODAL", () => setisOpen(false));
    };
  }, []);

  useModal(isOpen, modalRef, closeModal);
  return (
    <motion.div
      initial={{ opacity: 0, display: "none" }}
      animate={isOpen ? "enter" : "exit"}
      variants={ModalParentVariants}
      exit={{ opacity: 0, transition: { when: "afterChildren" } }}
      className={`${styles["container"]}`}
      onClick={closeModal}
    >
      <motion.div
        initial={{ y: "-100%" }}
        animate={isOpen ? { y: `100px` } : { y: "-100%" }}
        exit={{ y: "-100%" }}
        ref={modalRef}
        className={`${styles["modal-body"]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-end">
            <motion.span
              className="cursor-pointer"
              whileHover={{ scale: 1.2 }}
              onClick={closeModal}
            >
              <CloseIcon className="scale-85" />
            </motion.span>
          </div>
          <div className="pb-2 px-6">
            <div className="flex justify-center">{Icon[args.type]}</div>
            <p className="text-2xl font-semibold text-center pt-5 pb-1">
              {args.title}
            </p>
            <div className="pb-6">
              <p className="text-center text-gray-500">{args.content}</p>
            </div>
            <div className="flex justify-center gap-x-3">
              {!!args.btnText && (
                <Button
                  onClick={() => {
                    args.onAction();
                    closeModal();
                  }}
                  className={` px-4 py-2`}
                >
                  {args.btnText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
