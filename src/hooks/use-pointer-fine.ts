"use client";

import { useEffect, useState } from "react";

/** True on devices with a precise pointer (mouse/trackpad) that support hover. */
export function usePointerFine() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return fine;
}
