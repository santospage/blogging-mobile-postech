import AsyncStorage from '@react-native-async-storage/async-storage';

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;

export const tokenService = {
  async save(accessToken: string) {
    try {
      const expirationTime = Date.now() + ONE_HOUR * 1000;
      await AsyncStorage.setItem('ACCESS_TOKEN_KEY', accessToken);
      await AsyncStorage.setItem(
        'TOKEN_EXPIRATION_KEY',
        expirationTime.toString(),
      );
    } catch {
      console.error('Error saving token:');
    }
  },

  // Obtain token
  async get() {
    try {
      const token = await AsyncStorage.getItem('ACCESS_TOKEN_KEY');

      return token;
    } catch {
      return '';
    }
  },

  // Delete token
  async delete() {
    try {
      await AsyncStorage.removeItem('ACCESS_TOKEN_KEY');
      await AsyncStorage.removeItem('TOKEN_EXPIRATION_KEY');
    } catch {
      console.error('Error removing token:');
    }
  },

  async isValid() {
    const expirationTime = await AsyncStorage.getItem('TOKEN_EXPIRATION_KEY');

    try {
      const currentTime = Date.now();
      return (
        expirationTime !== null && currentTime <= parseInt(expirationTime, 10)
      );
    } catch {
      return false;
    }
  },
};
