import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

//import {RootStackParamList} from '../types';
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
          <Text style={styles.text}>Dynamic Blogging Classes</Text>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    padding: 16,
  },
  imagem: {
    width: 100,
    height: 100,
    marginVertical: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  textoBotao: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
