import produce from "immer";
import { IContract, IQuery, IStore } from "interfaces";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteContract,
  updateContract,
  updateContractItem,
  uploadContractsAPI,
} from "services/contractsService";
import {
  deleteTestContract,
  setItemDescription,
  setTestContract,
  toggleTestItemHiddenState,
} from "store/slices/testContractSlice";
import { resetUploadState } from "store/slices/uploadSlice";
import { ArrayMinusItem } from "utils/helpers";
import { useContracts, useUser } from "./apis";

export function usePropsForContract(contractId?: string) {
  // const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const { contractId: routeContractId } = router.query as IQuery;
  if (!contractId) contractId = routeContractId;

  const testContract = useSelector((state: IStore) => state.testContract);
  let { contracts, mutate, isLoading } = useContracts();
  let contractIndex = contracts?.findIndex((c) => c._id === contractId);
  let contract = contracts ? contracts[contractIndex] : null;
  const testSetDescription = (update: { _id: string; description: string }) => {
    dispatch(setItemDescription(update));
  };

  const testSetHiddenItem = (
    contractId: string,
    update: { _id: string; isHidden: boolean }
  ) => {
    dispatch(toggleTestItemHiddenState(update._id));
  };

  const liveSetHiddenItem = (
    contractId: string,
    update: { _id: string; isHidden: boolean }
  ) => {
    let newData = produce((data: any) => {
      let contracts = data.data;
      let contractIndex = contracts.findIndex(
        (c: IContract) => c._id === contractId
      );
      let contract: IContract = contracts[contractIndex];
      let itemIndex = contract.data.findIndex((c) => c._id === update._id);
      contract.data[itemIndex].isHidden = update.isHidden;
    });
    let oldData = produce((data: any) => {
      let contracts = data.data;
      let contractIndex = contracts.findIndex(
        (c: IContract) => c._id === contractId
      );
      let contract: IContract = contracts[contractIndex];
      let itemIndex = contract.data.findIndex((c) => c._id === update._id);
      contract.data[itemIndex].isHidden = !update.isHidden;
    });
    mutate(newData, false);
    (async () => {
      const { error } = await updateContractItem(contractId, update);
      if (!error) return;
      toast.error(`Error toggling the display of this function`);
      mutate(oldData, false);
    })();
  };

  const liveSetDescription = (update: { _id: string; description: string }) => {
    let oldContracts = contracts;
    let newData = produce((data: any) => {
      let contracts = data.data;
      let contractIndex = contracts.findIndex(
        (c: IContract) => c._id === contractId
      );
      let contract = contracts[contractIndex];
      contract.description = update.description;
    });
    mutate(newData, false);
    (async () => {
      const { error } = await updateContract(update);
      if (!error) return;
      toast.error("Error updating this description");
      mutate(oldContracts, false);
    })();
  };

  const testAddContract = (contract: IContract) => {
    dispatch(setTestContract(contract));
    dispatch(resetUploadState());
  };
  // make revert happen at same spot
  const liveAddContract = async (contract: IContract) => {
    const toastId = toast.loading(`Adding ${contract.name} contract...`);
    dispatch(resetUploadState());
    
    const { error, response } = await uploadContractsAPI([contract]);
    if (response) {
      let newData = produce((data: any) => {
        const retrievedContracts = response.data;
        retrievedContracts.forEach((c: IContract) => {
          data.data.push(c);
        });
      });
      mutate(newData, false);
    }
    if (!error) return toast.dismiss(toastId);
    toast.update(toastId, {
      render: "Error adding this contract",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
  };

  const testDeleteContract = () => {
    dispatch(deleteTestContract());
  };

  const liveDeleteContract = async () => {
    if (!contractId) return;
    let newData = produce((data: any) => {
      let contracts = data.data;
      let contractIndex = contracts.findIndex(
        (c: IContract) => c._id === contractId
      );
      let contract = contracts[contractIndex];
      data.data = ArrayMinusItem(contracts, contract);
    });
    const toastId = toast.loading("Deleting contract...");

    const { error, response } = await deleteContract(contractId);
    if (response) {
      const shouldReRoute = router.pathname.includes("/[contractId]/[itemId]");
      if (shouldReRoute) router.replace("/");
      mutate(newData, false);
      toast.dismiss(toastId);
      return;
    }
    if (error) {
      toast.update(toastId, {
        render: "Error deleting this contract",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  let props = {
    setDescription: contracts ? liveSetDescription : testSetDescription,
    SetHiddenItem: contracts ? liveSetHiddenItem : testSetHiddenItem,
    deleteThisContract: contracts ? liveDeleteContract : testDeleteContract,
    contract: contract || testContract,
    contracts: contracts,
    isLoading,
    mutate,
    addContract: contracts ? liveAddContract : testAddContract,
  };

  return props;
}
