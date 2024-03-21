import { useCallback, useEffect, useState } from "react";

const useMediaQueryProps = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
} as const;

export function useMediaQuery(key: keyof typeof useMediaQueryProps) {
  const [isMatch, setIsMatch] = useState(false);
  const isSmallScreen = useCallback(
    () => window.matchMedia(useMediaQueryProps[key]).matches,
    [key]
  );
  useEffect(() => {
    const updateScreenSize = () => {
      setIsMatch(isSmallScreen());
    };
    window.addEventListener("resize", updateScreenSize);

    updateScreenSize();

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, [isSmallScreen, key]);

  return isMatch;
}
