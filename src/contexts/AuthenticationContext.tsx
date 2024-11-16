import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState, useEffect } from 'react';

import { tokenService } from '../services/Auth/TokenService';
import { AuthContextType, AuthenticationProviderProps } from '../interfaces/Authentication/Authentication';

const ACCESS_TOKEN_KEY = 'access_token';
const USER_SESSION = 'user_session';

export const AuthenticationContext = createContext<AuthContextType | undefined>(undefined);

export function AuthentuicationProvider({ children }: AuthenticationProviderProps) {
    const [user, setUser] = useState<string | null>('');
    const [token, setToken] = useState<string | null>('');
    const [isLogged, setLogged] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {            
            const storedUser = await AsyncStorage.getItem(USER_SESSION);
            const storedToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

            if (storedUser && storedToken && await tokenService.isValid()) {
                setUser(storedUser);
                setToken(storedToken);
                setLogged(true);
            } else {
                await AsyncStorage.removeItem(USER_SESSION);
                await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
                setUser('');
                setToken('');
                setLogged(false);
            }        
        };

        fetchData();
    }, [token]);

    const logout = async () => {
        await AsyncStorage.removeItem(USER_SESSION);
        await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);

        setUser('');
        setToken('');
        setLogged(false);
    };

    return (
        <AuthenticationContext.Provider value={{ user, token, isLogged }}>
            {children}
        </AuthenticationContext.Provider>
    );
}
