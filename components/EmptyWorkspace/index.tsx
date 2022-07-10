import { EmptyFileIcon } from "assets/images";
import React from "react";

export function EmptyWorkspace() {
  return (
    <div className="flex flex-col items-center pt-40">
      <span className="mb-3">
        <EmptyFileIcon />
      </span>
      <span style={{ color: "#B9B9B9" }}>No smart contract found here</span>
    </div>
  );
}
