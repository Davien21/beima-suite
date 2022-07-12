import React, { useEffect } from "react";
import {
  Breadcrumbs,
  Button,
  DashboardLayout,
  InputsBox,
  OutputsBox,
  Select,
  Tooltip,
} from "components";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { IContract, IStore } from "interfaces";
import styles from "./item-page.module.css";
import { EditIcon, SettingsIcon } from "assets/images";
import { capitalize, getRandomKey } from "utils";

export default function ItenPage() {
  const router = useRouter();

  const contracts = useSelector((state: IStore) => state.contracts);
  const { contractId, itemId } = router.query;
  const contract = contracts.find((c: IContract) => c.id === contractId);
  const item = contract?.data.find((i: any) => i.name === itemId);
  const isValidRoute = contracts.some((c: IContract) => c.id === contractId);
  useEffect(() => {
    if (!contractId) return;
    if (!isValidRoute) router.replace("/");
  }, [contractId, isValidRoute, router]);
  if (!contract || !item) return "";

  const hasMeta = item.meta;

  return (
    <div>
      <DashboardLayout>
        <div className="h-full">
          <section className="px-8 3xl:px-16 py-10 border-b">
            <Breadcrumbs
              className="mb-2"
              crumbs={[contract.name, itemId as string]}
            />
            <div className="mb-2 flex items-center justify-between">
              <Tooltip title={item.name}>
                <h2 className={`${styles["functionName"]} text-3xl`}>
                  {item.name}
                </h2>
              </Tooltip>
              <div className={`${styles["options"]} flex gap-x-4`}>
                <div className="flex gap-x-4">
                  <button className="flex gap-x-1 items-center">
                    <EditIcon style={{ transform: "scale(1.15)" }} />
                    <span>Description</span>
                  </button>
                  <button className="flex gap-x-1 items-center">
                    <SettingsIcon />
                    <span>Settings</span>
                  </button>
                </div>
                {/* <Select> */}
                <Button secondary>Link Events</Button>
                {/* </Select> */}
              </div>
            </div>
            <div className="flex items-center">
              <div className={`${hasMeta ? "border-r pr-5 py-2" : ""} inline"`}>
                <span className={item.type}>{capitalize(item.type)}</span>
              </div>
              {hasMeta
                ? item.meta.map((meta: string) => (
                    <span key={getRandomKey()} className="meta">
                      {meta}
                    </span>
                  ))
                : ""}
            </div>
          </section>
          <section className="px-16 3xl:px-28 py-10">
            <div className="inline-grid grid-cols-9 gap-x-10">
              <div className="col-span-3">
                <InputsBox inputs={item.inputs} />
              </div>
              <div className="col-span-3">
                <OutputsBox outputs={item.outputs} />
              </div>
            </div>
          </section>
        </div>
      </DashboardLayout>
    </div>
  );
}
