import React from 'react';
import { render, screen } from '@testing-library/react-native';
import UserList from '../../../src/pages/User';
import { userService } from '../../../src/services/User/UserService';

jest.mock('../../../src/services/User/UserService', () => ({
  userService: {
    getUsers: jest.fn(),
    postUser: jest.fn(),
    putUser: jest.fn(),
    deleteUser: jest.fn(),
  },
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

describe('UserList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with an empty user list', async () => {
    (userService.getUsers as jest.Mock).mockReturnValueOnce(
      Promise.resolve({
        subscribe: ({ next }: { next: (value: unknown[]) => void }) => next([]),
      }),
    );

    render(<UserList />);

    expect(await screen.findByText(/Include/i)).toBeTruthy();
    expect(screen.queryByText(/User:/)).toBeNull();
  });
});
