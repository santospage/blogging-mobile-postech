import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import api from '../api';
import { UserModel } from '../../interfaces/User/User';
import { tokenService } from '../Auth/TokenService';

export const userService = {
  getUsers: async (): Promise<Observable<UserModel[]>> => {
    const token = await tokenService.get();

    return from(
      api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    ).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Failed to load users:', error.response || error);
        return throwError(
          () =>
            new Error(
              error.response?.data?.message ||
                'Failed to load users. Please try again later.'
            )
        );
      })
    );
  },

  postUser: async (user: UserModel) => {
    const token = await tokenService.get();

    return from(
      api.post('/users', user, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    ).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Failed to create user:', error.response || error);
        return throwError(
          () =>
            new Error(
              error.response?.data?.message ||
                'Failed to create user. Please try again later.'
            )
        );
      })
    );
  },

  putUser: async (user: UserModel): Promise<Observable<UserModel>> => {
    const token = await tokenService.get();

    return from(
      api.put(`/users/${user._id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    ).pipe(
      map((response) => {
        const updatedUser = response.data.id || response.data;
        return updatedUser;
      }),
      catchError((error) => {
        console.error('Failed to update user:', error.response || error);
        return throwError(
          () =>
            new Error(
              error.response?.data?.message ||
                'Failed to update user. Please try again later.'
            )
        );
      })
    );
  },

  deleteUser: async (userId: string): Promise<Observable<void>> => {
    const token = await tokenService.get();

    return from(
      api.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    ).pipe(
      map(() => {
        return;
      }),
      catchError((error) => {
        console.error('Failed to delete user:', error);
        return throwError(
          () => new Error('Failed to delete user. Please try again later.')
        );
      })
    );
  },
};
