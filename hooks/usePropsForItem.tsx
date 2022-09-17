import produce from "immer";
import { IQuery, IStore } from "interfaces";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toggleLinkEvent, updateContractItem } from "services/contractsService";
import {
  setItemDescription,
  toggleLinkTestEvent,
} from "store/slices/testContractSlice";
import {
  ArrayMinusItem,
  getAuthToken,
  getTestEvents,
  getEventsWithItem,
  getItemById,
} from "utils/helpers";
import { useItem, useUser } from "./apis";

export function usePropsForItem(contractId: string, itemId: string) {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { contractId: routeContractId, itemId: routeItemId } =
    router.query as IQuery;
  if (!contractId) contractId = routeContractId;
  if (!itemId) itemId = routeItemId;

  const testContract = useSelector((state: IStore) => state.testContract);
  let testItem = getItemById(testContract, itemId);

  const testEventsWithState = getTestEvents(testContract, itemId);
  let { item, mutate, isLoading } = useItem({ contractId, itemId });

  const liveLinkEvent = (event: string) => {
    let newItem = produce((data: any) => {
      let item = data.data;
      if (item.linkedEvents.includes(event)) {
        item.linkedEvents = ArrayMinusItem(item.linkedEvents, event);
        item.eventsWithState = getEventsWithItem(item);
      } else {
        item.linkedEvents = [...item.linkedEvents, event];
        item.eventsWithState = getEventsWithItem(item);
      }
    });
    mutate(newItem, false);
    let oldItem = produce((data: any) => {
      let item = data.data;
      if (item.linkedEvents.includes(event)) {
        item.linkedEvents = ArrayMinusItem(item.linkedEvents, event);
        item.eventsWithState = getEventsWithItem(item);
      } else {
        item.linkedEvents = [...item.linkedEvents, event];
        item.eventsWithState = getEventsWithItem(item);
      }
    });
    (async () => {
      const args = { contractId, itemId, event };
      const { error } = await toggleLinkEvent(args);
      if (!error) return;
      toast.error("Error updating this item");
      mutate(oldItem);
    })();
  };
  const testLinkEvent = (event: string) => {
    dispatch(toggleLinkTestEvent({ itemId, event }));
  };

  const testSetDescription = (update: { _id: string; description: string }) => {
    dispatch(setItemDescription(update));
  };

  const liveSetDescription = (update: { _id: string; description: string }) => {
    let oldDescription = item.description;
    let newItem = produce((data: any) => {
      let item = data.data;
      item.description = update.description;
    });
    mutate(newItem, false);
    let oldItem = produce((data: any) => {
      let item = data.data;
      item.description = oldDescription;
    });
    (async () => {
      const { error } = await updateContractItem(contractId, update);
      if (!error) return;
      toast.error("Error updating this description");
      mutate(oldItem, false);
    })();
  };

  // replace with 404 page:
  // if ((!user && !testItem) || (user && !isLoading && !!!item)) {
  //   router.replace("/");
  // }

  let props = {
    user,
    eventsWithState: getEventsWithItem(item) || testEventsWithState,
    linkEvent: item ? liveLinkEvent : testLinkEvent,
    setDescription: item ? liveSetDescription : testSetDescription,
    item: item || testItem,
    isLoading,
  };
  return props;
}
