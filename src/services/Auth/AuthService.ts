import { from, throwError } from 'rxjs';
import { timeout, retry, catchError, map } from 'rxjs/operators';

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
        }
      )
    ).pipe(
      timeout(10000),
      retry(2),
      map((response) => {        
        if (response.data.token) {
          tokenService.save(response.data.token);
          return response.data;
        } else {
          throw new Error('Falha na autenticação: token não encontrado');
        }
      }),
      catchError((error) => {
        console.error('Erro ao tentar autenticar:', error);        
        return throwError(() =>
          new Error(
            error.response?.data?.message || 'Falha ao autenticar. Tente novamente.'
          )
        );
      })
    );
  },
};