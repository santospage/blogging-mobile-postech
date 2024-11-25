import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClassRoomForm from '../../../../src/pages/ClassRoom/Form';

jest.mock('../../../../src/services/Category/CategoryService', () => ({
  categoryService: {
    getCategories: jest.fn(() => ({
      subscribe: jest.fn((handlers) => {
        handlers.next([
          { _id: '1', name: 'Category 1' },
          { _id: '2', name: 'Category 2' },
        ]);
        return { unsubscribe: jest.fn() };
      }),
    })),
  },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

describe('ClassRoomForm Component', () => {
  const mockOnSave = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form fields', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('Test User');
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('123');

    const { getByPlaceholderText } = render(
      <ClassRoomForm
        classRoom={null}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />,
    );

    await waitFor(() => {
      expect(getByPlaceholderText('Title')).toBeTruthy();
      expect(getByPlaceholderText('Resume')).toBeTruthy();
      expect(getByPlaceholderText('Detail')).toBeTruthy();
      expect(getByPlaceholderText('User')).toBeTruthy();
    });
  });

  it('should validate mandatory fields', async () => {
    const { getByText } = render(
      <ClassRoomForm
        classRoom={null}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />,
    );

    const confirmButton = getByText('Confirm');
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'All fields are mandatory!',
        visibilityTime: 3000,
      });
    });
  });

  test('should call onSave with correct data', async () => {
    const mockOnSave = jest.fn();

    render(
      <ClassRoomForm
        classRoom={null}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />,
    );

    fireEvent.changeText(screen.getByPlaceholderText('Detail'), 'Test Detail');
    fireEvent.changeText(screen.getByPlaceholderText('Title'), 'Test Title');
    fireEvent.changeText(screen.getByPlaceholderText('Resume'), 'Test Resume');

    const picker = screen.getByTestId('category-picker');
    fireEvent(picker, 'valueChange', 'Category 1');

    const confirmButton = screen.getByText('Confirm');
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith({
        title: 'Test Title',
        resume: 'Test Resume',
        detail: 'Test Detail',
        category: 'Category 1',
        user: '',
        date: expect.any(String),
        image: '',
      });
    });
  });

  it('should call onClose when Cancel button is pressed', async () => {
    const { getByText } = render(
      <ClassRoomForm
        classRoom={null}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />,
    );

    fireEvent.press(getByText('Cancel'));

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
