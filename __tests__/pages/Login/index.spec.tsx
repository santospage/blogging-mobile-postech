import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../../../src/pages/Login';
import { NavigationContainer } from '@react-navigation/native';
import { authService } from '../../../src/services/Auth/AuthService';
import { LoginScreenNavigationProp } from '../../../src/interfaces/Login/Login';

// Mock de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn().mockResolvedValue(null),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock do authService
jest.mock('../../../src/services/Auth/AuthService', () => ({
  login: jest.fn(),
}));

const mockNavigate = jest.fn();

const mockNavigation: LoginScreenNavigationProp = {
  navigate: mockNavigate,
  dispatch: jest.fn(),
  goBack: jest.fn(),
  isFocused: jest.fn(),
  canGoBack: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  navigateDeprecated: jest.fn(),
  preload: jest.fn(),
  getId: jest.fn(),
  setStateForNextRouteNamesChange: jest.fn(),
  setOptions: jest.fn(),
  replace: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  popTo: jest.fn(),
};

const renderWithNavigation = () => {
  return render(
    <NavigationContainer>
      <Login navigation={mockNavigation} />
    </NavigationContainer>,
  );
};

describe('Login', () => {
  it('should render the input fields and button', () => {
    const { getByPlaceholderText, getByText } = renderWithNavigation();

    expect(getByPlaceholderText('User')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
  });
});
