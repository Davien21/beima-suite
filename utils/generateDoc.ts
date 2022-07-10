import { IEvent, IFunction } from "interfaces";
import { TestSmartContract } from "./filterSmartContract";
import { getRandomKey } from "./randomKey";

export const getContractItemNames = (content: string) => {
  const docsArray = getDocsArray(content);
  return getDocItemNames(docsArray);
};

export const getDocsArray = (content: string) => {
  const regex =
    /(\b(?=\w)function \w+\(?.+\))|(\b(?=\w)event \w+\(?.+\))|(\w+ (public|external) \w+)/gim;
  const parsed = content.split(regex);
  const functions = parsed.filter((a) => a?.match(regex));

  return functions;
};

export const getContractName = (content: string) => {
  const nameRegex = /contract (\w+)/;
  const name = content.match(nameRegex)?.[1];
  return name || "";
};

export const getDocItemNames = (docsArray: string[]) => {
  return docsArray.map((fx: string) => {
    const arr = fx.split(" ");
    let name;
    if (!arr.includes("function") && !arr.includes("event"))
      name = arr[arr.length - 1];
    else name = arr[1].slice(0, arr[1].indexOf("("));

    return name;
  });
};

export const generateDocSchema = (
  name: string,
  natives: string[],
  abi: any[]
) => {
  const docItems: any[] = [];
  abi.forEach((item: any) => {
    const isNative = natives.includes(item.name);
    if (item.type === "function")
      docItems.push(generateFunctionSchema(item, isNative));
    else if (item.type === "event")
      docItems.push(generateEventSchema(item, isNative));
  });
  return getContractSchema(name, docItems);
};

const getContractSchema = (name: string, data: IFunction[] | IEvent[]) => {
  return {
    id: getRandomKey(),
    creator_id: "",
    name,
    alias: name,
    data,
  };
};

const generateInputSchema = (item: any[]) => {
  const inputs: any[] = [];
  item.forEach((input: any) => {
    let meta = [];
    if (input.indexed) meta.push("indexed");
    const result = {
      name: input.name,
      type: input.type,
      meta,
    };
    inputs.push(result);
  });
  return inputs;
};

const generateOutputSchema = (item: any[]) => {
  const outputs: any[] = [];
  item.forEach((input: any) => {
    const result = {
      name: input.name,
      type: input.type,
    };
    outputs.push(result);
  });
  return outputs;
};

const generateFunctionSchema = (item: any, isNative: boolean) => {
  const data = {
    name: item.name,
    type: item.type,
    inputs: generateInputSchema(item.inputs),
    outputs: generateOutputSchema(item.outputs),
    comment: "",
    isHidden: false,
    isNative,
    meta: item.meta,
  };
  return data as IFunction;
};

const generateEventSchema = (item: any, isNative: boolean) => {
  const data = {
    name: item.name,
    type: item.type,
    inputs: generateInputSchema(item.inputs),
    comment: "",
    isHidden: false,
    isNative,
    meta: item.meta,
  };
  return data as IEvent;
};

export const filterABI = (content: string) => {
  let ABIContent = JSON.parse(content);
  if (ABIContent.abi) ABIContent = ABIContent.abi;
  const data = ABIContent.filter((item: any) => {
    // if (!item.type.match(/function|event/)) return;
    return `${capitalize(item.type)} ${item.name}`;
  });
  console.log(data);
  return ABIContent;
};
