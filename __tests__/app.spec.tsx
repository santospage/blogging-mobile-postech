/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';
import Toast from 'react-native-toast-message';
import Navigation from '../src/routes/navigation';

jest.mock('@expo-google-fonts/poppins', () => ({
  useFonts: jest.fn(),
}));

jest.mock('react-native-toast-message', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock('../src/routes/navigation', () => {
  const Navigation = () => <></>;
  return Navigation;
});

jest.mock('../src/contexts/AuthenticationContext', () => ({
  AuthentuicationProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders null if fonts are not loaded', () => {
    const useFontsMock = require('@expo-google-fonts/poppins').useFonts;
    useFontsMock.mockReturnValue([false, null]);

    const { toJSON } = render(<App />);
    expect(toJSON()).toBeNull();
  });

  it('renders the app correctly after fonts are loaded', () => {
    const useFontsMock = require('@expo-google-fonts/poppins').useFonts;
    useFontsMock.mockReturnValue([true, null]);

    const { UNSAFE_getByType } = render(<App />);

    expect(UNSAFE_getByType(Navigation)).toBeTruthy();
    expect(UNSAFE_getByType(Toast)).toBeTruthy();
  });

  it('renders null if there is an error loading fonts', () => {
    const useFontsMock = require('@expo-google-fonts/poppins').useFonts;
    useFontsMock.mockReturnValue([false, 'Font Error']);

    const { toJSON } = render(<App />);
    expect(toJSON()).toBeNull();
  });
});
