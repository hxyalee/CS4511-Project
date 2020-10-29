import * as React from "react";

const useDebounce = (val: any, delay: number) => {
  const [debounceVal, setDebounceValue] = React.useState(val);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(val), delay);
    return () => clearTimeout(handler);
  }, [val]);
  return debounceVal;
};

export default useDebounce;
