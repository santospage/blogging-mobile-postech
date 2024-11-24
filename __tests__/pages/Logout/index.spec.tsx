import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logout from '../../../src/pages/Logout';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('Logout Component', () => {
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockNavigate = jest.fn();
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <Logout navigation={{ navigate: mockNavigate }} />,
    );
    expect(getByText('Are you sure you want to logout?')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('handles logout correctly', async () => {
    const { getByText } = render(
      <Logout navigation={{ navigate: mockNavigate }} />,
    );

    const confirmButton = getByText('Confirm');
    fireEvent.press(confirmButton);

    // Verifica se AsyncStorage foi chamado para limpar os dados
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('ACCESS_TOKEN_KEY', '');
  });

  it('handles cancel correctly', () => {
    const { getByText } = render(
      <Logout navigation={{ navigate: mockNavigate }} />,
    );

    const cancelButton = getByText('Cancel');
    fireEvent.press(cancelButton);

    // Verifica se a navegação foi chamada
    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });
});
