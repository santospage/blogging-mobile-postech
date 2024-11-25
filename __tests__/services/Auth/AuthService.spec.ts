import AsyncStorage from '@react-native-async-storage/async-storage';

// Mockando o AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const saveToken = async (token: string) => {
  await AsyncStorage.setItem('auth_token', token);
};

describe('Testing AuthService', () => {
  it('should save the token in AsyncStorage', async () => {
    const token = 'dummy-token';

    await saveToken(token);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('auth_token', token);
  });
});
