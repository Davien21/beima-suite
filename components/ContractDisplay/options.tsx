import {
  EditIcon,
  EyeIcon,
  OptionDotsIcon,
  PublishIcon,
  TrashIcon,
} from "assets/images";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useClickOutside, usePopper, usePropsForContract } from "hooks";
import { arrowVariants, menuVariants } from "animations";
import Pstyles from "./contract-display.module.css";
import { useDispatch } from "react-redux";
import { setIsContractDescModalOpen } from "store/slices/modalSlice";
import { IContract } from "interfaces";
import confirmation from "services/confirmationService";
import { setOpenedOptionId } from "store/slices/UIStateSlice";
import { useRouter } from "next/router";
import action from "services/actionModalService";
import { publishedDocsAction, signUpAction, waitlistAction } from "./meta";
import { publishContract } from "services/contractsService";
import { toast } from "react-toastify";
import { useUser } from "hooks/apis";

export function ContractOptions({ contract }: { contract: IContract }) {
  const contractId = contract._id;
  const { deleteThisContract } = usePropsForContract(contractId);

  const router = useRouter();
  const dispatch = useDispatch();

  const optionsMenuRef = useRef<any>(null);
  const objectRef = useRef<any>(null);
  const dropDownArrowRef = useRef<any>(null);

  usePopper(objectRef, optionsMenuRef, "right-start");

  const [isOpen, setisOpen] = useState<boolean>(false);

  const closeMenu = () => setisOpen(false);

  useClickOutside(optionsMenuRef, closeMenu, dropDownArrowRef);

  const initialAnimation = { rotate: 180, transition: { duration: 0 } };

  const { user } = useUser();

  const handleDeleteContract = () => {
    closeMenu();
    const message = `Are you sure you want to delete ${contract.name}?`;
    const onConfirm = () => deleteThisContract();
    confirmation.danger(message, onConfirm);
  };

  const handlePublish = async () => {
    closeMenu();
    if (!user) action.warning(signUpAction(() => router.push("/login")));
    else {
      const toastId = toast.loading(`Publishing docs for ${contract.name}...`);
      const { error, response } = await publishContract(contract._id);

      if (response) {
        const viewDocs = async () => {
          let baseURL = process.env.NEXT_PUBLIC_PREVIEW_BASE_URL;
          const preview_id = response.data.preview_id;
          let url = `${baseURL}/${preview_id}`;
          window.open(url, "_blank");
        };
        toast.dismiss(toastId);
        action.success(publishedDocsAction(viewDocs));
      }
      if (!error) return;
      toast.update(toastId, {
        render: "Error publising this contract",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handleEdit = () => {
    dispatch(setIsContractDescModalOpen(true));
    closeMenu();
  };

  const handlePreview = () => {
    closeMenu();
    let baseURL = process.env.NEXT_PUBLIC_PREVIEW_BASE_URL;
    const preview_id = contract.preview_id;
    let url = `${baseURL}/${preview_id}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (isOpen) dispatch(setOpenedOptionId(contract._id));
  }, [contract._id, dispatch, isOpen]);

  return (
    <div className="flex" ref={objectRef}>
      <motion.span
        className={`p-3 cursor-pointer ${Pstyles["toggler"]}`}
        initial={initialAnimation}
        animate={isOpen ? "open" : "closed"}
        variants={arrowVariants}
        onClick={(e) => {
          setisOpen(!isOpen);
          e.stopPropagation();
        }}
        ref={dropDownArrowRef}
      >
        <OptionDotsIcon />
      </motion.span>
      {isOpen && (
        <div className="" ref={optionsMenuRef}>
          <div className={`${Pstyles["options"]}`}>
            <motion.div
              initial="exit"
              animate={isOpen ? "enter" : "exit"}
              variants={menuVariants}
            >
              <ul className="options" onClick={(e) => e.stopPropagation()}>
                <li
                  className="p-4"
                  onClick={contract.preview_id ? handlePreview : handlePublish}
                >
                  <span className="flex items-center gap-x-2">
                    <span>
                      {contract.preview_id ? <EyeIcon /> : <PublishIcon />}
                    </span>
                    <span>
                      {contract.preview_id ? "Preview" : "Publish"}{" "}
                      Documentation
                    </span>
                  </span>
                </li>
                <li className="p-4" onClick={handleEdit}>
                  <span className="flex items-center gap-x-2">
                    <span>
                      <EditIcon />
                    </span>
                    <span>Edit Details</span>
                  </span>
                </li>
                <li className="p-4" onClick={handleDeleteContract}>
                  <span className="flex items-center gap-x-2">
                    <span>
                      <TrashIcon />
                    </span>
                    <span>Delete Documentation</span>
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
