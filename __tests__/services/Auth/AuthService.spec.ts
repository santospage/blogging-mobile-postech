import AsyncStorage from '@react-native-async-storage/async-storage';

// Mockando o AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Exemplo de uma função que usa o AsyncStorage
const saveToken = async (token: string) => {
  await AsyncStorage.setItem('auth_token', token);
};

describe('Testando AuthService', () => {
  it('deve salvar o token no AsyncStorage', async () => {
    const token = 'dummy-token';

    // Chama a função que usa o setItem
    await saveToken(token);

    // Verifique se o setItem foi chamado com os parâmetros esperados
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('auth_token', token);
  });
});
