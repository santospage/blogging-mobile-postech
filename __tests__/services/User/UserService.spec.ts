import { UserModel } from '../../../src/interfaces/User/User';
import { userService } from '../../../src/services/User/UserService';
import api from '../../../src/services/api';

jest.mock('../../../src/services/api');
jest.mock('../../../src/services/Auth/TokenService');

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn((key: 'ACCESS_TOKEN_KEY' | 'TOKEN_EXPIRATION_KEY') => {
    const store = {
      ACCESS_TOKEN_KEY: 'dummy-token',
      TOKEN_EXPIRATION_KEY: `${Date.now() + 3600 * 1000}`,
    };
    return Promise.resolve(store[key] || null);
  }),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

describe('userService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('deve retornar erro ao falhar ao carregar usuários', async () => {
      const mockError = { response: { data: { message: 'Load Error' } } };
      (api.get as jest.Mock).mockRejectedValue(mockError);

      const result = await userService.getUsers();
      result.subscribe({
        next: () => fail('Deveria ter falhado'),
        error: (error) => {
          expect(error.message).toBe('Load Error');
        },
      });
    });
  });

  describe('postUser', () => {
    it('deve retornar erro ao falhar ao criar usuário', async () => {
      const mockError = { response: { data: { message: 'Create Error' } } };
      (api.post as jest.Mock).mockRejectedValue(mockError);

      const result = await userService.postUser({
        _id: '1',
        name: 'Error User',
        user: 'errorUser',
        fullName: 'Error User Full Name',
        password: 'password123',
      } as UserModel);

      result.subscribe({
        next: () => fail('Deveria ter falhado'),
        error: (error) => {
          expect(error.message).toBe('Create Error');
        },
      });
    });
  });

  describe('putUser', () => {
    it('deve retornar erro ao falhar ao atualizar usuário', async () => {
      const mockError = { response: { data: { message: 'Update Error' } } };
      (api.put as jest.Mock).mockRejectedValue(mockError);

      const result = await userService.putUser({
        _id: '1',
        name: 'Error User',
        user: 'errorUser',
        fullName: 'Error User Full Name',
        password: 'password123',
      } as UserModel);

      result.subscribe({
        next: () => fail('Deveria ter falhado'),
        error: (error) => {
          expect(error.message).toBe('Update Error');
        },
      });
    });
  });

  describe('deleteUser', () => {
    it('deve retornar erro ao falhar ao excluir usuário', async () => {
      const mockError = new Error('Delete Error');
      (api.delete as jest.Mock).mockRejectedValue(mockError);

      const result = await userService.deleteUser('1');
      result.subscribe({
        next: () => fail('Deveria ter falhado'),
        error: (error) => {
          expect(error.message).toBe(
            'Failed to delete user. Please try again later.',
          );
        },
      });
    });
  });
});
