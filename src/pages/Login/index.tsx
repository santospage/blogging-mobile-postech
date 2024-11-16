import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';
import BasePage from '../BasePage';
import { authService } from '../../services/Auth/AuthService';
import { Props } from '../../interfaces/Login/Login';

export default function Login({ navigation }: Props) {
  const [user, onChangeNome] = useState<string>('');
  const [password, onChangeSenha] = useState<string>('');

  const handleLogin = () => {
    const loginData = {
      user: user,
      password: password,
    };
  
    authService.login(loginData).subscribe({
      next: async (response) => {    
        await AsyncStorage.setItem('USER_SESSION', user);
        onChangeNome('');
        onChangeSenha('');
        navigation.navigate('Drawer');
      },
      error: (error: any) => {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Authentication error',
          text2: 'Incorrect username or password',
          visibilityTime: 4000,
        });
      },
    });
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
              editable={true}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeSenha}
              value={password}
              placeholder="Password"
              placeholderTextColor={'#BCBCBC'}
              secureTextEntry
              editable={true}
            />
            
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={false}>
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
