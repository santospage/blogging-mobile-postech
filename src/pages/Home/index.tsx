import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import BasePage from '../BasePage';
import { Props } from '../../interfaces/Home/Home';

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <BasePage>
        <View style={styles.contentContainer}>
          <Image
            // eslint-disable-next-line @typescript-eslint/no-require-imports
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
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.textoBotao}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Drawer')}
          >
            <Text style={styles.textoBotao}>Classes</Text>
          </TouchableOpacity>
        </View>
      </BasePage>
    </View>
  );
}
