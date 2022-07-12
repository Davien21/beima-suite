import { getRandomKey } from "utils";
import { RightIcon } from "assets/images";
import React from "react";
import styles from "./breadcrumbs.module.css";

export function Breadcrumbs({
  crumbs,
  className,
}: {
  crumbs: string[];
  className?: string;
}) {
  let containerClass = `${styles["container"]} flex items-center`;
  if (className) containerClass += ` ${className}`;

  return (
    <div className={containerClass}>
      {crumbs.map((crumb, index) => {
        const isLastCrumb = index === crumbs.length - 1;
        return (
          <div className="flex items-center" key={getRandomKey()}>
            <span>{crumb}</span>
            {!isLastCrumb ? <RightIcon className="mx-1" /> : ""}
          </div>
        );
      })}
    </div>
  );
}
