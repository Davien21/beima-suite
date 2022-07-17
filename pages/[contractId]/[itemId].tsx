import React, { useEffect } from "react";
import {
  Breadcrumbs,
  Button,
  DashboardLayout,
  InputsBox,
  OutputsBox,
  Tooltip,
  LinkedEventsBox,
  MultipleSelect,
  FunctionDescModal,
  FunctionDescBox,
} from "components";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { IContract, IMetaTags, IStore } from "interfaces";
import styles from "./item-page.module.css";
import { EditIcon, SettingsIcon, UpIcon } from "assets/images";
import {
  capitalize,
  getMeta,
  getRandomKey,
  getLinkedEvents,
  getEventsWithActiveState,
} from "utils";
import { setLinkFunctionToEvent } from "store/slices";
import { setIsFunctionDescModalOpen } from "store/slices/modalSlice";
import Head from "next/head";

export default function ItemPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const contracts = useSelector((state: IStore) => state.contracts);
  const { contractId, itemId: functionName } = router.query;
  const contract = contracts.find((c: IContract) => c.id === contractId);

  const linkedEvents = getLinkedEvents(contract, functionName as string);
  const eventsWithState = getEventsWithActiveState(
    contract,
    functionName as string
  );

  const item = contract?.data.find((i: any) => i.name === functionName);
  const isValidRoute = contracts.some((c: IContract) => c.id === contractId);

  useEffect(() => {
    if (!contractId) return;
    if (!isValidRoute) router.replace("/");
  }, [contractId, isValidRoute, router]);

  if (!contract || !item) return "";

  const hasMeta = item.meta;

  const contractIndex = contracts.findIndex(
    (c: IContract) => c.id === contractId
  );
  const linkEvent = (eventName: string) => {
    dispatch(
      setLinkFunctionToEvent({
        contractIndex,
        functionName: functionName as string,
        eventName,
      })
    );
  };
  return (
    <DashboardLayout>
      <FunctionDescModal />
      <div className="h-full">
        <section className="px-8 3xl:px-16 py-10 border-b">
          <Breadcrumbs
            className="mb-2"
            crumbs={[contract.name, functionName as string]}
          />
          <div className="mb-2 flex items-center justify-between">
            <Tooltip title={item.name}>
              <h2 className={`${styles["functionName"]} text-3xl inline`}>
                {item.name}
              </h2>
            </Tooltip>
            <div className={`${styles["options"]} flex gap-x-4`}>
              <div className="flex gap-x-4">
                <button
                  onClick={() => {
                    dispatch(setIsFunctionDescModalOpen(true));
                  }}
                  className="flex gap-x-1 items-center"
                >
                  <EditIcon style={{ transform: "scale(1.15)" }} />
                  <span>Description</span>
                </button>
                <button className="flex gap-x-1 items-center">
                  <SettingsIcon />
                  <span>Settings</span>
                </button>
              </div>
              <MultipleSelect
                onSelect={linkEvent}
                list={eventsWithState}
                isSearchable
              >
                <Button secondary>Link Events</Button>
              </MultipleSelect>
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
          <FunctionDescBox comment={item.comment} />
        </section>
        <section className="px-16 3xl:px-28 ">
          <div className="inline-grid grid-cols-10 gap-x-10">
            <div className="col-span-3">
              <InputsBox inputs={item.inputs} />
            </div>
            <div className="col-span-3">
              <OutputsBox outputs={(item.outputs as []) || []} />
            </div>
            <div className="col-span-4">
              <LinkedEventsBox events={linkedEvents} />
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
