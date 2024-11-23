import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ListClasses from '../../../src/pages/Classes';
// eslint-disable-next-line max-len
import { classroomService } from '../../../src/services/Classes/ClassRoomService';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../../../src/services/Classes/ClassRoomService', () => ({
  classroomService: {
    getClasses: jest.fn(() => ({
      subscribe: jest.fn((handlers) => {
        handlers.next([
          {
            _id: '1',
            title: 'Class 1',
            resume: 'Resume 1',
            detail: 'Details about Class 1',
            category: { name: 'Category 1' },
            user: { user: 'User 1' },
          },
          {
            _id: '2',
            title: 'Class 2',
            resume: 'Resume 2',
            detail: 'Details about Class 2',
            category: { name: 'Category 2' },
            user: { user: 'User 2' },
          },
        ]);
        return { unsubscribe: jest.fn() };
      }),
    })),
  },
}));

describe('ListClasses Component', () => {
  const renderWithNavigation = (ui: React.ReactElement) => {
    return render(<NavigationContainer>{ui}</NavigationContainer>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a list of classes', async () => {
    const { getByText, queryByPlaceholderText } = renderWithNavigation(
      <ListClasses />,
    );

    await waitFor(() => {
      expect(getByText('Resume 1')).toBeTruthy();
      expect(getByText('Resume 2')).toBeTruthy();
    });

    expect(queryByPlaceholderText('Search')).toBeTruthy();
  });

  it('should filter the list of classes based on search input', async () => {
    const { getByText, getByPlaceholderText, queryByText } =
      renderWithNavigation(<ListClasses />);

    const searchInput = getByPlaceholderText('Search');

    await waitFor(() => expect(getByText('Resume 1')).toBeTruthy());

    fireEvent.changeText(searchInput, 'Resume 1');

    await waitFor(() => {
      expect(getByText('Resume 1')).toBeTruthy();
      expect(queryByText('Resume 2')).toBeFalsy();
    });
  });

  it('should handle error when fetching classes', async () => {
    const mockSubscribe = {
      subscribe: jest.fn((handlers) => {
        handlers.error('Error fetching classes');
        return { unsubscribe: jest.fn() };
      }),
    };

    (classroomService.getClasses as jest.Mock).mockReturnValue(mockSubscribe);

    const alertSpy = jest.spyOn(Alert, 'alert');

    renderWithNavigation(<ListClasses />);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Alert', 'Error fetching classes');
    });
  });
});
