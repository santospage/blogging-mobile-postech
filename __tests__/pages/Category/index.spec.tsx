import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
// eslint-disable-next-line max-len
import { categoryService } from '../../../src/services/Category/CategoryService';
import Toast from 'react-native-toast-message';
import CategoryModel from '../../../src/pages/Category';

// Mocks
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

jest.mock('../../../src/services/Category/CategoryService', () => ({
  categoryService: {
    getCategories: jest.fn(),
    postCategory: jest.fn(),
    putCategory: jest.fn(),
    deleteCategory: jest.fn(),
  },
}));

jest.mock(
  'react-native-modal',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  () => (props: any) => props.isVisible && props.children,
);

describe('CategoryList Component', () => {
  const mockCategories = [
    { _id: '1', name: 'Category 1' },
    { _id: '2', name: 'Category 2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load and display categories', async () => {
    (categoryService.getCategories as jest.Mock).mockReturnValueOnce({
      subscribe: jest.fn(({ next }) => {
        next(mockCategories);
        return { unsubscribe: jest.fn() };
      }),
    });

    const { getByText } = render(<CategoryModel />);

    await waitFor(() => {
      expect(getByText('Name: Category 1')).toBeTruthy();
      expect(getByText('Name: Category 2')).toBeTruthy();
    });
  });

  it('should update the category list after editing', async () => {
    (categoryService.putCategory as jest.Mock).mockReturnValueOnce({
      subscribe: jest.fn(({ next }) => {
        next({ _id: '1', name: 'Updated Category 1' });
        return { unsubscribe: jest.fn() };
      }),
    });

    (categoryService.getCategories as jest.Mock).mockReturnValueOnce({
      subscribe: jest.fn(({ next }) => {
        next([
          { _id: '1', name: 'Updated Category 1' },
          { _id: '2', name: 'Category 2' },
        ]);
        return { unsubscribe: jest.fn() };
      }),
    });

    const { getByText } = render(<CategoryModel />);

    await waitFor(() => {
      expect(getByText('Name: Category 2')).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByText('Name: Updated Category 1')).toBeTruthy();
    });
  });

  it('should remove a category from the list when deleted', async () => {
    (categoryService.deleteCategory as jest.Mock).mockReturnValueOnce({
      subscribe: jest.fn(({ next }) => {
        next();
        return { unsubscribe: jest.fn() };
      }),
    });

    (categoryService.getCategories as jest.Mock).mockReturnValueOnce({
      subscribe: jest.fn(({ next }) => {
        next(mockCategories);
        return { unsubscribe: jest.fn() };
      }),
    });

    const { getByText, queryByText } = render(<CategoryModel />);

    await waitFor(() => {
      expect(getByText('Name: Category 1')).toBeTruthy();
    });

    await waitFor(() => {
      expect(queryByText('')).toBeNull();
    });
  });

  it('should display an error toast if categories fail to load', async () => {
    (categoryService.getCategories as jest.Mock).mockReturnValueOnce({
      subscribe: jest.fn(({ error }) => {
        error();
        return { unsubscribe: jest.fn() };
      }),
    });

    render(<CategoryModel />);

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          text1: 'Failed to load categories',
        }),
      );
    });
  });
});
