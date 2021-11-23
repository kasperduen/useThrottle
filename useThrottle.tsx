import { useEffect, useRef, useState } from "react";

export const useThrottle = (query: string, milliSeconds: number) => {
  const [throttledQuery, setThrottledQuery] = useState(query);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const nextVal = useRef(null) as any;
  const hasNewVal = useRef(false) as any;

  useEffect(() => {
    if (!timeout.current) {
      setThrottledQuery(query);
      const throttleCallback = () => {
        if (hasNewVal.current) {
          hasNewVal.current = false;
          setThrottledQuery(nextVal.current);
          timeout.current = setTimeout(throttleCallback, milliSeconds);
        } else {
          timeout.current = undefined;
        }
      };
      timeout.current = setTimeout(throttleCallback, milliSeconds);
    } else {
      nextVal.current = query;
      hasNewVal.current = true;
    }
  }, [query]);

  return throttledQuery;
};

import { useEffect, useRef, useState } from "react";
