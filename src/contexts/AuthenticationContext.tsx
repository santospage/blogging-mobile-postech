import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState, useEffect } from 'react';

import { tokenService } from '../services/Auth/TokenService';
import {
  AuthContextType,
  AuthenticationProviderProps,
} from '../interfaces/Authentication/Authentication';

export const AuthenticationContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthentuicationProvider({
  children,
}: AuthenticationProviderProps) {
  const [user, setUser] = useState<string | null>('');
  const [token, setToken] = useState<string | null>('');
  const [isLogged, setLogged] = useState<boolean>(false);

  const login = async (user: string, token: string) => {
    await AsyncStorage.setItem('USER_SESSION', user);
    await AsyncStorage.setItem('ACCESS_TOKEN_KEY', token);

    setUser(user);
    setToken(token);
    setLogged(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('USER_SESSION');
    await AsyncStorage.removeItem('ACCESS_TOKEN_KEY');

    setUser('');
    setToken('');
    setLogged(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = await AsyncStorage.getItem('USER_SESSION');
      const storedToken = await AsyncStorage.getItem('ACCESS_TOKEN_KEY');

      if (storedUser && storedToken && (await tokenService.isValid())) {
        setUser(storedUser);
        setToken(storedToken);
        setLogged(true);
      } else {
        await AsyncStorage.removeItem('USER_SESSION');
        await AsyncStorage.removeItem('ACCESS_TOKEN_KEY');
        setUser('');
        setToken('');
        setLogged(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{ user, token, isLogged, login, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
