import { getRandomKey } from "utils";
import { ClosePanelIcon, TooltipIcon } from "assets/images";
import { IContractInputs, IEvent } from "interfaces";
import React from "react";
import styles from "./linked-events-box.module.css";
import { Tooltip } from "components";

export function LinkedEventsBox({ events }: { events: string[] }) {
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
                key={getRandomKey()}
                className="inline-flex items-center gap-x-1"
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
