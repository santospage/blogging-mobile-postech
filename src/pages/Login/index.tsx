import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import { styles } from './styles';
import BasePage from '../BasePage';
import { authService } from '../../services/Auth/AuthService';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Cadastro: undefined;
  Drawer: undefined;
  ListClasses: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function Login({ navigation }: Props) {
  const [user, onChangeNome] = useState<string>('');
  const [password, onChangeSenha] = useState<string>('');

  const handleLogin = async () => {
    try {
      const loginData = {
        user: user,
        password: password,
      };

      const response = await authService.login(loginData);

      if (response) {
        sessionStorage.setItem('userSession', user);
        navigation.navigate('Drawer');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erro de autenticação',
        text2: 'Usuário ou senha incorretos',
        visibilityTime: 4000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <BasePage>
        <ImageBackground
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
        >
          <View style={styles.contentContainer}>
            <Image
              source={require('../../../assets/logo.png')}
              style={styles.image1}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeNome}
              value={user}
              placeholder="User"
              placeholderTextColor={'#BCBCBC'}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeSenha}
              value={password}
              placeholder="Password"
              placeholderTextColor={'#BCBCBC'}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.textoBotao}>Confirm</Text>
            </TouchableOpacity>
            <Image
              source={require('../../../assets/login.png')}
              style={styles.image2}
            />
          </View>
        </ImageBackground>
      </BasePage>
      <Toast />
    </View>
  );
}
