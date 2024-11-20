import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { styles } from './styles';
import BasePage from '../BasePage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Logout({ navigation }: any) {
  const handleLogout = async () => {
    // Clear authentications information
    await AsyncStorage.setItem('ACCESS_TOKEN_KEY', '');
    await AsyncStorage.setItem('USER_SESSION', '');
    await AsyncStorage.setItem('TOKEN_EXPIRATION_KEY', '');

    // Home navigation
    navigation.navigate('Home');
  };

  const handleCancel = () => {
    // Home navigation
    navigation.navigate('Home');
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
              style={styles.image}
            />
            <Text style={styles.logoutText}>
              Are you sure you want to logout?
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.textoBotao}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCancel}>
              <Text style={styles.textoBotao}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </BasePage>
    </View>
  );
}
