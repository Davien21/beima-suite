import { getRandomKey } from "utils";
import { ClosePanelIcon, TooltipIcon } from "assets/images";
import { IContractInputs, IEvent } from "interfaces";
import React, { useEffect } from "react";
import styles from "./linked-events-box.module.css";
import { Tooltip } from "components";
import { useRouter } from "next/router";

export function LinkedEventsBox({ events }: { events: string[] }) {
  const router = useRouter();
  const { contractId, itemId: functionName } = router.query;

  let tableGroupsClass = "border-t grid grid-cols-2";
  // if (events.length) tableGroupsClass += " border-b";
  const willScroll = events.length > 4;
  return (
    <div className={`${styles["container"]} `}>
      <div className="p-5 flex gap-x-4 items-center">
        <span className="grey font-medium">Linked Events</span>
        <Tooltip
          placement="top"
          title={`There are ${
            events.length || "no"
          } linked events for this function`}
        >
          <TooltipIcon className={styles["tooltip"]} />
        </Tooltip>
      </div>

      <div
        className={`${styles["event-list"]} flex flex-wrap gap-x-6 p-5 border-t`}
      >
        {events.length > 0 ? (
          events.map((event: any) => {
            return (
              <div
                onClick={() => {
                  router.push(`/${contractId}/${event}?type=event`);
                }}
                key={getRandomKey()}
                className="inline-flex items-center gap-x-1  default-link cursor-pointer"
              >
                <span className="underline text-sm">{event}</span>
                <ClosePanelIcon className={styles["go-to-btn"]} />
              </div>
            );
          })
        ) : (
          <p className="grey">No Events have been linked yet</p>
        )}
      </div>
    </div>
  );
}
