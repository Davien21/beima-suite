export interface IFunction {
  name: string;
  type: string;
  inputs: { name: string; type: string; meta?: string[] }[];
  outputs?: { name: string; type: string }[];
  comment: string;
  isHidden: boolean;
  isNative: boolean;
  meta: string[];
}

export interface IEvent {
  name: string;
  type: string;
  inputs: { name: string; type: string; meta?: string[] }[];
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
