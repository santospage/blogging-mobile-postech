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

import { styles } from './styles';
import BasePage from '../BasePage';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Cadastro: undefined;
  Drawer: undefined;
  ListaPets: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function Login({ navigation }: Props) {
  const [nome, onChangeNome] = useState<string>('');
  const [senha, onChangeSenha] = useState<string>('');

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
              value={nome}
              placeholder="User"
              placeholderTextColor={'#BCBCBC'}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeSenha}
              value={senha}
              placeholder="Password"
              placeholderTextColor={'#BCBCBC'}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Drawer')}
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
    </View>
  );
}
