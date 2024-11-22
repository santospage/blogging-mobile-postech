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
import { userService } from '../../services/User/UserService';
import { UserModel } from '../../interfaces/User/User';

export default function Login({ navigation }: Props) {
  const [user, onChangeNome] = useState<string>('');
  const [password, onChangeSenha] = useState<string>('');

  // Find user by userName
  const fetchUsers = async (userName: string) => {
    try {
      (await userService.getUsers()).subscribe({
        next: async (response) => {
          const selectedUser = response.find(
            (user: UserModel) => user.user === userName
          );

          if (selectedUser) {
            await AsyncStorage.setItem('USER_SESSION', selectedUser.user);
            await AsyncStorage.setItem('USER_ID', selectedUser._id!);
          } else {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'User not found',
              text2: 'The specified user does not exist.',
              visibilityTime: 3000,
            });
          }
        },
        error: (error) => {
          console.error('Error fetching users:', error);
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error fetching users',
            text2: 'Could not fetch the user data.',
            visibilityTime: 3000,
          });
        },
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error fetching users',
        text2: 'Could not fetch the user data.',
        visibilityTime: 3000,
      });
    }
  };

  const handleLogin = async () => {
    const loginData = {
      user: user,
      password: password,
    };

    // Clear authentications information
    await AsyncStorage.setItem('ACCESS_TOKEN_KEY', '');
    await AsyncStorage.setItem('USER_SESSION', '');
    await AsyncStorage.setItem('USER_ID', '');
    await AsyncStorage.setItem('TOKEN_EXPIRATION_KEY', '');

    authService.login(loginData).subscribe({
      next: async (response) => {
        onChangeNome('');
        onChangeSenha('');
        await fetchUsers(user);
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

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={false}
            >
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
