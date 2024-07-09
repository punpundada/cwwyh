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
    if (!window) return;
    const matchQueryList = window.matchMedia(useMediaQueryProps[key]);
    if (matchQueryList.matches !== isMatch) {
      setIsMatch(matchQueryList.matches);
    }

    const listener = () => setIsMatch(matchQueryList.matches);

    window.addEventListener("resize", listener);
    return () => {
      matchQueryList.removeEventListener("resize", listener);
    };
  }, [key]);

  return isMatch;
}
