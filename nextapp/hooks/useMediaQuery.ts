import { useEffect, useState } from "react";

const useMediaQueryProps = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
} as const;

export function useMediaQuery(key: keyof typeof useMediaQueryProps) {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const matchQueryList = window.matchMedia(useMediaQueryProps[key]);
    function handleChange(e: MediaQueryListEvent) {
      setIsMatch(e.matches);
    }
    matchQueryList.addEventListener("change", handleChange);
    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [key]);

  return isMatch;
}
