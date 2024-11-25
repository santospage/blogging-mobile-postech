import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UserForm from '../../../../src/pages/User/Form';

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

it('should render with initial state and display the user', () => {
  const user = {
    user: 'Existing User',
    fullName: 'Existing User',
    email: 'existing@example.com',
    password: 'password123',
  };

  const { getByPlaceholderText, getByText } = render(
    <UserForm user={user} onSave={jest.fn()} onClose={jest.fn()} />,
  );

  const input = getByPlaceholderText('User');
  const confirmButton = getByText('Confirm');
  const cancelButton = getByText('Cancel');

  expect(input.props.value).toBe('Existing User');
  expect(confirmButton).toBeTruthy();
  expect(cancelButton).toBeTruthy();
});

it('should call onSave with correct when Confirm is pressed', async () => {
  const mockOnSave = jest.fn();
  const mockOnClose = jest.fn();

  const user = {
    user: 'Existing User',
    fullName: 'Existing User',
    email: 'existing@example.com',
    password: 'password123',
  };

  const { getByText, getByPlaceholderText } = render(
    <UserForm user={user} onSave={mockOnSave} onClose={mockOnClose} />,
  );

  const input = getByPlaceholderText('User');
  fireEvent.changeText(input, 'Updated User');

  const confirmButton = getByText('Confirm');
  fireEvent.press(confirmButton);

  await waitFor(() => {
    expect(mockOnSave).toHaveBeenCalledWith({
      user: 'Updated User',
      fullName: 'Existing User',
      email: 'existing@example.com',
      password: 'password123',
    });
  });
});
