import {
  IContract,
  IEvent,
  IWithActiveState,
  IFunction,
  IItem,
  IAuth,
} from "interfaces";

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getEventsWithActiveState = (
  contract: IContract | undefined,
  functionName: string
) => {
  const linkedEvents = getLinkedEvents(contract, functionName);
  const allEvents = getAllEvents(contract);

  const unlinkedEvents = allEvents.map((e: IItem) => {
    const isActive = linkedEvents.includes(e.name);
    return { name: e.name, isActive };
  });
  return (unlinkedEvents as IWithActiveState[]) || [];
};

export const getLinkedEvents = (
  contract: IContract | undefined,
  functionName: string
) => {
  return (
    contract?.data.find((c: IItem) => c.name === functionName)?.linkedEvents ||
    []
  );
};

export const getAllEvents = (contract: IContract | undefined) => {
  return contract?.data.filter((e: IItem) => e.type === "event") || [];
};

export const getArrayAfterRemovingItem = (array: any[], item: any) => {
  return array.filter((i: any) => i !== item);
};

export const getdescriptionFromContract = (
  contract: IContract | undefined,
  functionName: string
) => {
  return (
    contract?.data.find((c: IItem) => c.name === functionName)?.description ||
    ""
  );
};

export const getUserInitials = (user: IAuth["user"]) => {
  const firstName = user.firstName || "";
  const lastName = user.lastName || "";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  return initials.toUpperCase();
};

export const getFullName = (user: IAuth["user"]) => {
  const firstName = user.firstName || "";
  const lastName = user.lastName || "";
  return `${capitalize(firstName)} ${capitalize(lastName)}`;
};

export const errorMessage = (error: any) => {
  if (error.data?.message.includes("Can't send mail"))
    return "Error - 550, Please check if your email is valid";
  return error.data?.message || "Something went wrong";
};
