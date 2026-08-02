"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type BrandMorphContextValue = {
  morphProgress: number;
  setMorphProgress: (value: number) => void;
};

const BrandMorphContext = createContext<BrandMorphContextValue | null>(null);

export function BrandMorphProvider({ children }: { children: ReactNode }) {
  const [morphProgress, setMorphProgress] = useState(0);
  const value = useMemo(
    () => ({ morphProgress, setMorphProgress }),
    [morphProgress],
  );

  return (
    <BrandMorphContext.Provider value={value}>
      {children}
    </BrandMorphContext.Provider>
  );
}

export function useBrandMorph() {
  const context = useContext(BrandMorphContext);
  if (!context) {
    throw new Error("useBrandMorph must be used within BrandMorphProvider");
  }
  return context;
}
