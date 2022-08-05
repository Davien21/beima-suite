import React, { ReactElement, useEffect, useState } from "react";
import {
  Breadcrumbs,
  Button,
  DashboardLayout,
  InputsBox,
  OutputsBox,
  Tooltip,
  LinkedEventsBox,
  MultipleSelect,
  ItemDescModal,
  ItemDescBox,
} from "components";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { IContract, IItem, IMetaTags, IQuery, IStore } from "interfaces";
import styles from "./item-page.module.css";
import { EditIcon, SettingsIcon } from "assets/images";
import {
  capitalize,
  getMeta,
  getRandomKey,
  getLinkedEvents,
  getEventsWithActiveState,
} from "utils";
import { setIsItemDescModalOpen } from "store/slices/modalSlice";
import { toast } from "react-toastify";
import { ArrayMinusItem, deepClone, getItemById } from "utils/helpers";
import { toggleOpenContract } from "store/slices/UIStateSlice";
import { toggleLinkTestEvent } from "store/slices/testContractSlice";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";
import { useGetContracts } from "hooks/apis/useGetContracts";
import { useGetItem } from "hooks/apis";
import { toggleLinkEvent } from "services/contractsService";
import { mutate as globalMutate } from "swr";

export default function ItemPage() {
  const { user } = useSelector((state: IStore) => state.auth);
  const router = useRouter();
  const { contractId, itemId } = router.query as IQuery;
  const isLoggedIn = !!user.firstName;
  const dispatch = useDispatch();

  let item: IItem | undefined, contract: IContract | undefined;
  const testContract = useSelector((state: IStore) => state.testContract);
  let { data: contracts } = useGetContracts();
  let { data: itemData, mutate } = useGetItem({ contractId, itemId });

  if (!isLoggedIn) {
    contract = testContract;
    item = getItemById(testContract, itemId);
  } else if (isLoggedIn) {
    if (itemData) {
      contract = contracts.find((c: IContract) => c._id === contractId);
      if (contract) item = itemData;
    }
  }

  const [authToken, setJwt] = useLocalStorage("beima-auth-token", "");
  const isValidRoute = !!item;

  useEffect(() => {
    if (!contractId) return;
    // if (!isValidRoute) router.replace("/");
  }, [contractId, dispatch, isValidRoute, router]);

  const { activeControl } = useSelector((state: IStore) => state.filters);

  if (!contract || !item) return "";

  const linkedEvents = getLinkedEvents(contract, itemId);
  const eventsWithState = getEventsWithActiveState(contract, itemId);
  let url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  url = `${url}/contracts`;
  const hasMeta = item.meta;

  const linkEvent = (event: string) => {
    if (!isLoggedIn) {
      dispatch(toggleLinkTestEvent({ functionId: itemId, event }));
    } else {
      let newLinkedEvents;
      if (!itemData?.linkedEvents) return;
      if (itemData.linkedEvents.includes(event)) {
        newLinkedEvents = ArrayMinusItem(itemData.linkedEvents, event);
      } else newLinkedEvents = [...itemData.linkedEvents, event];
      let newItem = deepClone(itemData);
      newItem.linkedEvents = newLinkedEvents;

      const options = { optimisticData: newItem, rollbackOnError: true };
      mutate(async () => {
        const { error } = await toggleLinkEvent(
          contractId,
          itemData._id,
          { event },
          authToken
        );
        if (error) return toast.error("Error updating this item");
        globalMutate(url);
        return newItem;
      }, options);
    }
  };
  return (
    <>
      <ItemDescModal item={item} />
      <div className="">
        <section className="px-8 3xl:px-16 py-10 border-b">
          <Breadcrumbs className="mb-2" crumbs={[contract.name, item.name]} />
          <div className="mb-2 flex items-center justify-between">
            <Tooltip title={item.name}>
              <h2 className={`${styles["itemId"]} text-3xl inline`}>
                {item.name}
              </h2>
            </Tooltip>
            <div className={`${styles["options"]} flex gap-x-4`}>
              <div className="flex gap-x-4">
                <button
                  onClick={() => {
                    dispatch(setIsItemDescModalOpen(true));
                  }}
                  className="flex gap-x-1 items-center"
                >
                  <EditIcon style={{ transform: "scale(1.15)" }} />
                  <span>Description</span>
                </button>
                <button
                  onClick={() => toast.info("Settings feature coming soon!")}
                  className="flex gap-x-1 items-center"
                >
                  <SettingsIcon />
                  <span>Settings</span>
                </button>
              </div>
              {activeControl === "function" && (
                <MultipleSelect
                  onSelect={linkEvent}
                  list={eventsWithState}
                  isSearchable
                >
                  <Button secondary>Link Events</Button>
                </MultipleSelect>
              )}
            </div>
          </div>
          <div className="flex gap-x-4 items-center">
            <div className={`${hasMeta ? "border-r pr-4 py-2" : ""} inline"`}>
              <span className={item.type}>{capitalize(item.type)}</span>
            </div>
            <div className="gap-x-2">
              {hasMeta
                ? item.meta.map((tag: string) => (
                    <Tooltip
                      key={getRandomKey()}
                      title={getMeta(tag as IMetaTags).desc}
                    >
                      <span key={getRandomKey()} className="meta">
                        {getMeta(tag as IMetaTags).initial}
                      </span>
                    </Tooltip>
                  ))
                : ""}
            </div>
          </div>
        </section>
        <section className="px-16 3xl:px-28 py-6">
          <ItemDescBox type={item.type} description={item.description} />
          <section className="mt-6">
            <div className="inline-grid grid-cols-10 gap-x-10">
              <div className="col-span-3">
                <InputsBox inputs={item.inputs} />
              </div>
              {activeControl === "function" && (
                <div className="col-span-3">
                  <OutputsBox outputs={(item.outputs as []) || []} />
                </div>
              )}

              {activeControl === "function" && (
                <div className="col-span-4">
                  <LinkedEventsBox events={linkedEvents} />
                </div>
              )}
            </div>
          </section>
        </section>
      </div>
    </>
  );
}

ItemPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
