import { ClassRoomModel } from '../../../src/interfaces/Classes/Classes';
import api from '../../../src/services/api';
// eslint-disable-next-line max-len
import { classroomService } from '../../../src/services/Classes/ClassRoomService';

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

describe('classroomService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getClasses', () => {
    it('deve retornar uma lista de classes', (done) => {
      const mockClasses = [{ _id: '1', title: 'Test Class' }];
      (api.get as jest.Mock).mockResolvedValue({ data: mockClasses });

      classroomService.getClasses().subscribe({
        next: (classes) => {
          expect(classes).toEqual(mockClasses);
          expect(api.get).toHaveBeenCalledWith('/classes');
          done();
        },
        error: done.fail,
      });
    });

    it('deve retornar erro quando a API falhar', (done) => {
      const mockError = new Error('Failed to load classes');
      (api.get as jest.Mock).mockRejectedValue(mockError);

      classroomService.getClasses().subscribe({
        next: () => done.fail('Deveria ter falhado'),
        error: (error) => {
          expect(error.message).toBe(
            'Failed to load classes. Please try again later.',
          );
          done();
        },
      });
    });

    it('deve retornar erro ao falhar a chamada gerencial', async () => {
      const mockError = { response: { data: { message: 'API Error' } } };
      (api.get as jest.Mock).mockRejectedValue(mockError);

      const result = await classroomService.getClassesManagerial();
      result.subscribe({
        next: () => fail('Deveria ter falhado'),
        error: (error) => {
          expect(error.message).toBe('API Error');
        },
      });
    });
  });

  describe('postClassRoom', () => {
    it('deve retornar erro ao falhar ao criar sala de aula', async () => {
      const mockError = { response: { data: { message: 'Create Error' } } };
      (api.post as jest.Mock).mockRejectedValue(mockError);

      const result = await classroomService.postClassRoom({
        _id: '1',
        title: 'Error Class',
        detail: '',
        resume: '',
        category: { name: '' },
      } as ClassRoomModel);

      result.subscribe({
        next: () => fail('Deveria ter falhado'),
        error: (error) => {
          expect(error.message).toBe('Create Error');
        },
      });
    });
  });

  describe('putClassRoom', () => {
    it('deve retornar erro ao falhar ao atualizar sala de aula', async () => {
      const mockError = { response: { data: { message: 'Update Error' } } };
      (api.put as jest.Mock).mockRejectedValue(mockError);

      const result = await classroomService.putClassRoom({
        _id: '1',
        title: 'Error Class',
        detail: '',
        resume: '',
        category: { name: '' },
      } as ClassRoomModel);

      result.subscribe({
        next: () => fail('Deveria ter falhado'),
        error: (error) => {
          expect(error.message).toBe('Update Error');
        },
      });
    });
  });

  describe('deleteClassRoom', () => {
    it('deve retornar erro ao falhar ao excluir sala de aula', async () => {
      const mockError = new Error('Delete Error');
      (api.delete as jest.Mock).mockRejectedValue(mockError);

      const result = await classroomService.deleteClassRoom('1');
      result.subscribe({
        next: () => fail('Deveria ter falhado'),
        error: (error) => {
          expect(error.message).toBe(
            'Failed to delete classroom. Please try again later.',
          );
        },
      });
    });
  });
});
