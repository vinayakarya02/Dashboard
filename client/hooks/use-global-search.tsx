import React, { createContext, useContext, useState } from "react";

interface GlobalSearchContextProps {
  query: string;
  setQuery: (q: string) => void;
}

const GlobalSearchContext = createContext<GlobalSearchContextProps | undefined>(undefined);

export const GlobalSearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState("");
  return (
    <GlobalSearchContext.Provider value={{ query, setQuery }}>
      {children}
    </GlobalSearchContext.Provider>
  );
};

export function useGlobalSearch() {
  const ctx = useContext(GlobalSearchContext);
  if (!ctx) throw new Error("useGlobalSearch must be used within GlobalSearchProvider");
  return ctx;
}
