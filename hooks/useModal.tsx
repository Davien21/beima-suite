import { RefObject, useEffect, useState } from "react";

export function useModal(isOpen: boolean, modalRef: RefObject<HTMLElement>) {
  const [modalHeight, setmodalHeight] = useState<number>(0);

  useEffect(() => {
    if (modalRef.current) setmodalHeight(modalRef.current.clientHeight);

    document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, modalRef]);
}
