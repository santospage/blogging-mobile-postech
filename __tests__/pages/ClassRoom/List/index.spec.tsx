import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ClassRoomList from '../../../../src/pages/ClassRoom/List';
// eslint-disable-next-line max-len
import { classroomService } from '../../../../src/services/Classes/ClassRoomService';
import { ClassRoomModel } from '../../../../src/interfaces/Classes/Classes';
import Toast from 'react-native-toast-message';

// Mocks
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

jest.mock('../../../../src/services/Classes/ClassRoomService', () => ({
  classroomService: {
    getClassesManagerial: jest.fn(),
    postClassRoom: jest.fn(),
    putClassRoom: jest.fn(),
    deleteClassRoom: jest.fn(),
  },
}));

jest.mock(
  'react-native-modal',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  () => (props: any) => props.isVisible && props.children,
);

// Mock de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn().mockResolvedValue(null),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const mockClasses: ClassRoomModel[] = [
  {
    _id: '1',
    title: 'Class 1',
    resume: 'Resume 1',
    detail: 'Detail 1',
    category: { name: 'Category 1' },
    user: { user: 'User 1' },
    updatedAt: '2024-01-01',
    image: 'image1.jpg',
  },
];

describe('ClassRoomList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load and display classes', async () => {
    (classroomService.getClassesManagerial as jest.Mock).mockReturnValueOnce({
      subscribe: jest.fn(({ next }) => {
        next(mockClasses);
        return { unsubscribe: jest.fn() };
      }),
    });

    const { getByText } = render(<ClassRoomList />);

    await waitFor(() => {
      expect(getByText('Title: Class 1')).toBeTruthy();
    });
  });

  it('should update the classroom list after editing', async () => {
    (classroomService.putClassRoom as jest.Mock).mockReturnValueOnce({
      subscribe: jest.fn(({ next }) => {
        next([
          {
            _id: '1',
            title: 'Updated Class 1',
            resume: 'Resume 1',
            detail: 'Detail 1',
            category: { name: 'Category 1' },
            user: { user: 'User 1' },
            updatedAt: '2024-01-01',
            image: 'image1.jpg',
          },
        ]);
        return { unsubscribe: jest.fn() };
      }),
    });

    (classroomService.getClassesManagerial as jest.Mock).mockReturnValueOnce({
      subscribe: jest.fn(({ next }) => {
        next([
          {
            _id: '1',
            title: 'Updated Class 1',
            resume: 'Resume 1',
            detail: 'Detail 1',
            category: { name: 'Category 1' },
            user: { user: 'User 1' },
            updatedAt: '2024-01-01',
            image: 'image1.jpg',
          },
        ]);
        return { unsubscribe: jest.fn() };
      }),
    });

    const { getByText } = render(<ClassRoomList />);

    await waitFor(() => {
      expect(getByText('Title: Updated Class 1')).toBeTruthy();
    });
  });

  it('should display an error toast if classes fail to load', async () => {
    (classroomService.getClassesManagerial as jest.Mock).mockReturnValueOnce({
      subscribe: jest.fn(({ error }) => {
        error();
        return { unsubscribe: jest.fn() };
      }),
    });

    render(<ClassRoomList />);

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          text1: 'Failed to load classes',
        }),
      );
    });
  });
});
