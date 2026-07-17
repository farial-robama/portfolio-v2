"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    const step = Math.max(1, Math.round(target / 24));
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setValue(current);
    }, 40);

    return () => clearInterval(timer);
  }, [active, target]);

  return value;
}
