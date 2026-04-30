import { useState, useEffect } from "react";

const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (value === debouncedValue) return;


    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  
  }, [value, delay, debouncedValue]);

  return  debouncedValue ;
};

export default useDebounce;
