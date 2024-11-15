import { Login } from '../../interfaces/Login/Login';
import api from '../api';
import { tokenService } from '../Auth/TokenService';

export const authService = {
  async login(loginData: Login) {
    try {
      const response = await api.post('/login', {
        user: loginData.user,
        password: loginData.password,
      });

      if (response.data.token) {
        tokenService.save(response.data.token);
        return response.data;
      } else {
        throw new Error('Falha na autenticação: token não encontrado');
      }
    } catch (error: any) {
      console.error('Erro ao tentar autenticar', error);
      throw new Error(
        error.response?.data?.message || 'Falha ao autenticar. Tente novamente.'
      );
    }
  },
};
