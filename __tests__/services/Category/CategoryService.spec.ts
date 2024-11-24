import { CategoryModel } from '../../../src/interfaces/Category/Category';
import api from '../../../src/services/api';
// eslint-disable-next-line max-len
import { categoryService } from '../../../src/services/Category/CategoryService';

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

describe('categoryService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategories', () => {
    it('deve retornar uma lista de categorias', (done) => {
      const mockCategories = [{ _id: '1', name: 'Test Category' }];
      (api.get as jest.Mock).mockResolvedValue({ data: mockCategories });

      categoryService.getCategories().subscribe({
        next: (categories) => {
          expect(categories).toEqual(mockCategories);
          expect(api.get).toHaveBeenCalledWith('/categories');
          done();
        },
        error: done.fail,
      });
    });

    it('deve retornar erro quando a API falhar', (done) => {
      const mockError = new Error('Failed to load categories');
      (api.get as jest.Mock).mockRejectedValue(mockError);

      categoryService.getCategories().subscribe({
        next: () => done.fail('Deveria ter falhado'),
        error: (error) => {
          expect(error.message).toBe(
            'Failed to load categories. Please try again later.',
          );
          done();
        },
      });
    });
  });

  describe('postCategory', () => {
    it('deve retornar erro ao falhar ao criar categoria', async () => {
      const mockError = { response: { data: { message: 'Create Error' } } };
      (api.post as jest.Mock).mockRejectedValue(mockError);

      const result = await categoryService.postCategory({
        _id: '1',
        name: 'Error Category',
      } as CategoryModel);

      result.subscribe({
        next: () => fail('Deveria ter falhado'),
        error: (error) => {
          expect(error.message).toBe('Create Error');
        },
      });
    });
  });

  describe('putCategory', () => {
    it('deve retornar erro ao falhar ao atualizar categoria', async () => {
      const mockError = { response: { data: { message: 'Update Error' } } };
      (api.put as jest.Mock).mockRejectedValue(mockError);

      const result = await categoryService.putCategory({
        _id: '1',
        name: 'Updated Category',
      } as CategoryModel);

      result.subscribe({
        next: () => fail('Deveria ter falhado'),
        error: (error) => {
          expect(error.message).toBe('Update Error');
        },
      });
    });
  });

  describe('deleteCategory', () => {
    it('deve retornar erro ao falhar ao excluir categoria', async () => {
      const mockError = new Error('Delete Error');
      (api.delete as jest.Mock).mockRejectedValue(mockError);

      const result = await categoryService.deleteCategory('1');
      result.subscribe({
        next: () => fail('Deveria ter falhado'),
        error: (error) => {
          expect(error.message).toBe(
            'Failed to delete category. Please try again later.',
          );
        },
      });
    });
  });
});
