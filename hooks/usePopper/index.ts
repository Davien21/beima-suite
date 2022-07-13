import { createPopper } from "@popperjs/core";
import { RefObject, useEffect } from "react";
import { PopperOptions } from "./options";

export function usePopper(
  referenceElementRef: RefObject<HTMLElement>,
  popperRef: RefObject<HTMLElement>,
  options: "top" | "bottom" | "right-start" = "bottom"
) {
  let placement = PopperOptions[options];

  useEffect(() => {
    if (
      window &&
      document &&
      referenceElementRef.current &&
      popperRef.current
    ) {
      createPopper(referenceElementRef.current, popperRef.current, placement);
    }
  });
  return true;
}
