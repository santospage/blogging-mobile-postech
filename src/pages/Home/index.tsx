import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {styles} from './styles';
import BasePage from '../BasePage';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Cadastro: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function Home({navigation}: Props) {
  return (
    <View style={styles.container}>
      <BasePage>
        <View style={styles.contentContainer}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.imagem}
          />
          <Text style={[styles.text, styles.title]}>Welcome!</Text>
          <Text style={[styles.text, styles.subtitle]}>
            Dynamic Blogging Classes
          </Text>
          <Text style={styles.text}>
            The perfect space to learn, share, and clarify your doubts.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textoBotao}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.textoBotao}>Classes</Text>
          </TouchableOpacity>
        </View>
      </BasePage>
    </View>
  );
}
