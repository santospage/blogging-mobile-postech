import { ClassRoomModel } from '../../../src/interfaces/Classes/Classes';
import api from '../../../src/services/api';
// eslint-disable-next-line max-len
import { classroomService } from '../../../src/services/Classes/ClassRoomService';

jest.mock('../../../src/services/api');
jest.mock('../../../src/services/Auth/TokenService');

// Mock AsyncStorage
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
    it('should return a list of classes', (done) => {
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

    it('should return error when API fails', (done) => {
      const mockError = new Error('Failed to load classes');
      (api.get as jest.Mock).mockRejectedValue(mockError);

      classroomService.getClasses().subscribe({
        next: () => done.fail('Should have failed'),
        error: (error) => {
          expect(error.message).toBe(
            'Failed to load classes. Please try again later.',
          );
          done();
        },
      });
    });

    it('should return an error when the management call fails', async () => {
      const mockError = { response: { data: { message: 'API Error' } } };
      (api.get as jest.Mock).mockRejectedValue(mockError);

      const result = await classroomService.getClassesManagerial();
      result.subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.message).toBe('API Error');
        },
      });
    });
  });

  describe('postClassRoom', () => {
    it('should return error when failing to create classroom', async () => {
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
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.message).toBe('Create Error');
        },
      });
    });
  });

  describe('putClassRoom', () => {
    it('should return error when failing to update classroom', async () => {
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
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.message).toBe('Update Error');
        },
      });
    });
  });

  describe('deleteClassRoom', () => {
    it('should return error when failing to delete classroom', async () => {
      const mockError = new Error('Delete Error');
      (api.delete as jest.Mock).mockRejectedValue(mockError);

      const result = await classroomService.deleteClassRoom('1');
      result.subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.message).toBe(
            'Failed to delete classroom. Please try again later.',
          );
        },
      });
    });
  });
});
