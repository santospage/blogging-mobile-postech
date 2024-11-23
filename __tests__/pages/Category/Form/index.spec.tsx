import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CategoryForm from '../../../../src/pages/Category/Form';

describe('CategoryForm', () => {
  const mockOnSave = jest.fn();
  const mockOnClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render with initial state and display the name', () => {
    const category = { name: 'Existing Category' };

    const { getByPlaceholderText, getByText } = render(
      <CategoryForm
        category={category}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />,
    );

    const input = getByPlaceholderText('Name');
    const confirmButton = getByText('Confirm');
    const cancelButton = getByText('Cancel');

    expect(input.props.value).toBe('Existing Category');
    expect(confirmButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
  });

  it('should call onSave with correct when Confirm is pressed', async () => {
    const category = { name: 'Existing Category' };
    const { getByText, getByPlaceholderText } = render(
      <CategoryForm
        category={category}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />,
    );

    const input = getByPlaceholderText('Name');
    fireEvent.changeText(input, 'Updated Category');

    const confirmButton = getByText('Confirm');
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith({ name: 'Updated Category' });
    });
  });
});
