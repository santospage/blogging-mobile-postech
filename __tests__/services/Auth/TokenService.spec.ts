import AsyncStorage from '@react-native-async-storage/async-storage';
import { tokenService } from '../../../src/services/Auth/TokenService';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('tokenService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('should save the token and expiration in AsyncStorage', async () => {
      const accessToken = 'dummy-token';
      const mockedNow = 1732474917839;
      jest.spyOn(Date, 'now').mockReturnValue(mockedNow);

      const expirationTime = mockedNow + 60 * 60 * 1000;

      await tokenService.save(accessToken);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'ACCESS_TOKEN_KEY',
        accessToken,
      );
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'TOKEN_EXPIRATION_KEY',
        expirationTime.toString(),
      );
    });
  });

  describe('get', () => {
    it('should get the token correctly', async () => {
      const accessToken = 'dummy-token';
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(accessToken);

      const token = await tokenService.get();

      expect(token).toBe(accessToken);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('ACCESS_TOKEN_KEY');
    });

    // eslint-disable-next-line max-len
    it('should return an empty string if there is an error getting the token', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
        new Error('Failed to get'),
      );

      const token = await tokenService.get();

      expect(token).toBe('');
    });
  });

  describe('delete', () => {
    it('should remove token and AsyncStorage expiration', async () => {
      await tokenService.delete();

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('ACCESS_TOKEN_KEY');
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
        'TOKEN_EXPIRATION_KEY',
      );
    });
  });

  describe('isValid', () => {
    it('should return true if the token is valid', async () => {
      const expirationTime = (Date.now() + 60 * 60 * 1000).toString();
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(expirationTime);

      const result = await tokenService.isValid();

      expect(result).toBe(true);
    });

    it('should return false if the token is expired', async () => {
      const expirationTime = (Date.now() - 60 * 60 * 1000).toString();
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(expirationTime);

      const result = await tokenService.isValid();

      expect(result).toBe(false);
    });

    it('should return false if there is no expiration stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await tokenService.isValid();

      expect(result).toBe(false);
    });
  });
});
