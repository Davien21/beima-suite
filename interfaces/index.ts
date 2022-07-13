export interface IContractInputs {
  name: string;
  type: string;
  meta?: string[];
}

export interface IContractOutputs {
  name: string;
  type: string;
}
export interface IFunction {
  name: string;
  type: "function";
  inputs: IContractInputs[];
  outputs: IContractOutputs[];
  comment: string;
  isHidden: boolean;
  isNative: boolean;
  meta: string[];
  linkedEvents?: string[];
}

export interface IEvent {
  name: string;
  type: "event";
  inputs: IContractInputs[];
  comment: string;
  isHidden: boolean;
  isNative: boolean;
  meta: string[];
}

export interface IContract {
  id: string;
  creator_id?: string;
  name: string;
  alias: string;
  data: IFunction[];
  isOpen?: boolean;
  showInherited: {
    function: boolean;
    event: boolean;
  };
  activeControl: "function" | "event";
}

export interface IHiddenContractItem {
  contractId: string;
  isHidden: boolean;
  name: string;
}

export interface IModals {
  isUploadModalOpen: boolean;
}

export interface IUpload {
  name: string;
  contractData: string[] | null;
  documentation: IContract | null;
  contractFile: File | null;
  abiFile: File | null;
  abiData: any[] | null;
  step: number;
  activeTab: string;
}

export interface IStore {
  modal: IModals;
  contracts: IContract[];
  upload: IUpload;
}

export type IMetaTags = "view" | "payable" | "nonpayable" 