import { ReactNode } from 'react';

export interface AuthContextType {
  user: string | null;
  token: string | null;
  isLogged: boolean;
  login: (user: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface AuthenticationProviderProps {
  children: ReactNode;
}
