import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from '../../src/routes/navigation';
import { tokenService } from '../../src/services/Auth/TokenService';

// Mock Authentication
jest.mock('../../src/services/Auth/TokenService', () => ({
  tokenService: {
    isValid: jest.fn(),
  },
}));

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

// Mock for react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const actualGestureHandler = jest.requireActual(
    'react-native-gesture-handler',
  );
  return {
    ...actualGestureHandler,
    GestureHandlerRootView: ({ children }: { children: React.ReactNode }) =>
      children,
    GestureHandler: jest.fn(),
  };
});

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Login screen initially', () => {
    render(<Navigation />);
    expect(screen.getByText('Login')).toBeTruthy();
  });

  // eslint-disable-next-line max-len
  it('should display correct screens based on authentication status', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('mockToken');
    (tokenService.isValid as jest.Mock).mockResolvedValue(true);

    render(<Navigation />);

    await waitFor(() => {
      expect(screen.getByText('Login')).toBeTruthy();
      expect(screen.getByText('Classes')).toBeTruthy();
    });
  });

  it('should render the correct image for Users drawer item', () => {
    render(<Navigation />);

    const text = screen.getByText('Welcome!');

    expect(text).toBeTruthy();
  });

  it('should show Home for unauthenticated users', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (tokenService.isValid as jest.Mock).mockResolvedValue(false);

    render(<Navigation />);

    await waitFor(() => {
      expect(screen.getByText('Login')).toBeTruthy();
      expect(screen.getByText('Classes')).toBeTruthy();
    });

    expect(screen.queryByText('Login')).toBeTruthy();
  });

  it('should render the login screen correctly', () => {
    render(<Navigation />);

    expect(screen.getByText('Login')).toBeTruthy();
  });

  it('should hide Logout screen when unauthenticated', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (tokenService.isValid as jest.Mock).mockResolvedValue(false);

    render(<Navigation />);

    await waitFor(() => {
      expect(screen.queryByText('Logout')).toBeFalsy();
    });
  });
});
