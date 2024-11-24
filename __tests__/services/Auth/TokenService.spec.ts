import AsyncStorage from '@react-native-async-storage/async-storage';
import { tokenService } from '../../../src/services/Auth/TokenService';

// Mockando o AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('tokenService', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  describe('save', () => {
    it('deve salvar o token e a expiração no AsyncStorage', async () => {
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
    it('deve obter o token corretamente', async () => {
      const accessToken = 'dummy-token';
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(accessToken);

      const token = await tokenService.get();

      expect(token).toBe(accessToken);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('ACCESS_TOKEN_KEY');
    });

    // eslint-disable-next-line max-len
    it('deve retornar uma string vazia se houver erro ao obter o token', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
        new Error('Failed to get'),
      );

      const token = await tokenService.get();

      expect(token).toBe('');
    });
  });

  describe('delete', () => {
    it('deve remover o token e a expiração do AsyncStorage', async () => {
      await tokenService.delete();

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('ACCESS_TOKEN_KEY');
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
        'TOKEN_EXPIRATION_KEY',
      );
    });
  });

  describe('isValid', () => {
    it('deve retornar true se o token for válido', async () => {
      const expirationTime = (Date.now() + 60 * 60 * 1000).toString();
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(expirationTime);

      const result = await tokenService.isValid();

      expect(result).toBe(true);
    });

    it('deve retornar false se o token estiver expirado', async () => {
      const expirationTime = (Date.now() - 60 * 60 * 1000).toString();
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(expirationTime);

      const result = await tokenService.isValid();

      expect(result).toBe(false);
    });

    it('deve retornar false se não houver expiração armazenada', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

      const result = await tokenService.isValid();

      expect(result).toBe(false);
    });
  });
});
