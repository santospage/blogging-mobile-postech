import { createContext } from 'react';

export const GlobalContext = createContext({});

import { ReactNode } from 'react';

export function InfoProvider({ children }: { children: ReactNode }) {
  const valor = 150
  
    return (
    <GlobalContext.Provider value={{
        valor
    }}>
      {children}
    </GlobalContext.Provider>
  );
}