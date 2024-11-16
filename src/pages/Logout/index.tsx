import React from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';

import { styles } from './styles';
import BasePage from '../BasePage';
import { useContext } from 'react';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';

export default function Logout({ navigation }: any) {
  const { logout } = useContext(AuthenticationContext) || {}; 
  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, Logout',
          onPress: async () => {            
            await logout();          
            
            // Navigate to Home screen
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: true }
    );
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
            <Text style={styles.logoutText}>Are you sure you want to logout?</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.textoBotao}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </BasePage>
    </View>
  );
}
