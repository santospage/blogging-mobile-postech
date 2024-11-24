import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  AuthenticationContext,
  AuthentuicationProvider,
} from '../../src/contexts/AuthenticationContext';

// Mocking AsyncStorage and tokenService
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  removeItem: jest.fn(),
  getItem: jest.fn().mockResolvedValue(null),
}));

jest.mock('../../src/services/Auth/TokenService', () => ({
  tokenService: {
    isValid: jest.fn(),
  },
}));

describe('AuthenticationContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render user data correctly', async () => {
    const user = 'user1';
    const token = 'token123';

    // Mocking AsyncStorage
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(user);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(token);

    const { getByText } = render(
      <AuthentuicationProvider>
        <AuthenticationContext.Consumer>
          {(context) => {
            if (!context) return null;
            return (
              <>
                <Text>{context.user}</Text>
                <Text>{context.token}</Text>
                <Text>{String(context.isLogged)}</Text>
                <Button title="Logout" onPress={() => context.logout()} />
              </>
            );
          }}
        </AuthenticationContext.Consumer>
      </AuthentuicationProvider>,
    );

    fireEvent.press(getByText('Logout'));
  });
});
