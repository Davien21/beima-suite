import React, { ReactElement } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { IMetaTags, IStore } from "interfaces";
import styles from "./item-page.module.css";
import { EditIcon, SettingsIcon } from "assets/images";
import { capitalize, getMeta, getRandomKey } from "utils";
import { setIsItemDescModalOpen } from "store/slices/modalSlice";
import { toast } from "react-toastify";

import { Skeleton } from "antd";
import { usePropsForItem } from "hooks";
export default function ItemPage() {
  const { item, eventsWithState, linkEvent, isLoading } = usePropsForItem();
  const dispatch = useDispatch();

  const { activeControl } = useSelector((state: IStore) => state.filters);

  if (isLoading) return <Loader />;

  return (
    <>
      {!!item && <ItemDescModal />}
      {!!item && (
        <div className="">
          <section className="px-8 3xl:px-16 py-10 border-b">
            <Breadcrumbs
              className="mb-2"
              crumbs={[item.contract.name, item.name]}
            />
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
              <div
                className={`${!!item.meta ? "border-r pr-4 py-2" : ""} inline"`}
              >
                <span className={item.type}>{capitalize(item.type)}</span>
              </div>
              <div className="gap-x-2">
                {!!item.meta &&
                  item.meta.map((tag: string) => (
                    <Tooltip
                      key={getRandomKey()}
                      title={getMeta(tag as IMetaTags).desc}
                    >
                      <span key={getRandomKey()} className="meta">
                        {getMeta(tag as IMetaTags).initial}
                      </span>
                    </Tooltip>
                  ))}
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
                    <LinkedEventsBox events={item.linkedEvents} />
                  </div>
                )}
              </div>
            </section>
          </section>
        </div>
      )}
    </>
  );
}

ItemPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

const Loader = () => {
  return (
    <div>
      <div className="p-3 my-8">
        <Skeleton round active style={{ borderRadius: "10px" }} />
      </div>
      <div className="p-3">
        <Skeleton round active style={{ borderRadius: "10px" }} />
      </div>
    </div>
  );
};
