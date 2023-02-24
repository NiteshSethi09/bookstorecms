import { useState, useEffect } from "react";

const useDebounce = <T extends unknown>(value: T, milliSeconds?: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds ?? 250);

    return () => clearTimeout(handler);
  }, [value, milliSeconds]);

  return debouncedValue;
};

export default useDebounce;
