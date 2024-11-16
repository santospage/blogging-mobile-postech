import { ReactNode } from 'react';

export interface AuthContextType {
    user: string | null;
    token: string | null;
    isLogged: boolean;
}

export interface AuthenticationProviderProps {
    children: ReactNode;
}