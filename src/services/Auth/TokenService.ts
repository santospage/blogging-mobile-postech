import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_BLOGGING';
const TOKEN_EXPIRATION_KEY = 'TOKEN_EXPIRATION_BLOGGING';
const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;

export const tokenService = {
  async save(accessToken: string) {
    try {
      const expirationTime = Date.now() + ONE_HOUR * 1000;

      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      await AsyncStorage.setItem(
        TOKEN_EXPIRATION_KEY,
        expirationTime.toString()
      );
    } catch (error) {
      console.error('Erro ao salvar o token:', error);
    }
  },

  // Obtain token
  async get() {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
      const expirationTime = await AsyncStorage.getItem(TOKEN_EXPIRATION_KEY);

      if (!token || !expirationTime) {
        return '';
      }

      const currentTime = Date.now();
      if (currentTime > parseInt(expirationTime, 10)) {
        await this.delete();
        return '';
      }

      return token;
    } catch (error) {
      console.error('Erro ao obter o token:', error);
      return '';
    }
  },

  // Delete token
  async delete() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
      await AsyncStorage.removeItem(TOKEN_EXPIRATION_KEY);
    } catch (error) {
      console.error('Erro ao remover o token:', error);
    }
  },
};
