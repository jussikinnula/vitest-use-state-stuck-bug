import { useEffect, useRef, useState } from "react";

const useBar = () => {
  const [bar, setBar] = useState<string | undefined>(undefined);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    const timeout = window.setTimeout(() => {
      if (mounted.current) {
        setBar("nice");
      }
    }, 250);

    return () => {
      mounted.current = false;
    };
  }, []);

  return bar;
};

export default useBar;
