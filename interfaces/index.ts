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
  description: string;
  isHidden: boolean;
  isNative: boolean;
  meta: string[];
  linkedEvents: string[];
}

export interface IEvent {
  name: string;
  type: "event";
  inputs: IContractInputs[];
  description: string;
  isHidden: boolean;
  isNative: boolean;
  meta: string[];
}

export interface IItem {
  name: string;
  type: ITypes;
  inputs: IContractInputs[];
  outputs?: IContractOutputs[];
  description: string;
  isHidden: boolean;
  isNative: boolean;
  meta: string[];
  linkedEvents?: string[];
}

export interface IContract {
  id: string;
  creator_id?: string;
  name: string;
  alias: string;
  data: IItem[];
  showInherited: {
    function: boolean;
    event: boolean;
  };
  description: string;
}

export interface IHiddenContractItem {
  contractId: string;
  isHidden: boolean;
  name: string;
}

export interface IModals {
  isUploadModalOpen: boolean;
  isFunctionDescModalOpen: boolean;
  isContractDescModalOpen: boolean;
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
  auth: IAuth;
  helper: IHelperSlice;
}

export interface IWithActiveState {
  name: string;
  isActive: boolean;
}

export interface IAuth {
  isLoggedIn: boolean;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  beimaAuthToken: string;
}

export interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IRTKQueryResponse {
  error: { data: any; status: number };
  data: { data: any; message: string; success: boolean };
  [key: string]: any;
}

export interface IHelperSlice {
  verifyOTPEmail: string;
}

export type IMetaTags = "view" | "payable" | "nonpayable";

export type ITypes = "function" | "event";
