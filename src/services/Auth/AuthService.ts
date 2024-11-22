import { from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Login } from '../../interfaces/Login/Login';
import api from '../api';
import { tokenService } from '../Auth/TokenService';

export const authService = {
  login: (loginData: Login) => {
    return from(
      api.post(
        '/login',
        {
          user: loginData.user,
          password: loginData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    ).pipe(
      map((response) => {
        if (response.data.token) {
          tokenService.save(response.data.token);
          return response.data;
        } else {
          throw new Error('Authentication failed: token not found');
        }
      }),
      catchError((error) => {
        console.error('Error when trying to authenticate:', error);
        return throwError(
          () =>
            new Error(
              error.response?.data?.message ||
                'Failed to authenticate. Please try again later.',
            ),
        );
      }),
    );
  },
};
