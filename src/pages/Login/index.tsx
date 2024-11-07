import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import BasePage from '../BasePage';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Cadastro: undefined;
  Drawer: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Login: React.FC<Props> = ({navigation}) => {
  const [nome, onChangeNome] = useState<string>('');
  const [senha, onChangeSenha] = useState<string>('');

  return (
    <View style={styles.container}>
      <BasePage>
        <ImageBackground
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}>
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
              onPress={() => navigation.navigate('Drawer')}>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#3772FF',
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    fontWeight: '400',
  },
  contentContainer: {
    gap: 32,
    paddingLeft: 56,
    paddingRight: 56,
    paddingTop: 150,
    justifyContent: 'center',
    flex: 1,
  },
  image1: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginVertical: 16,
  },
  image2: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    marginBottom: 120,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImageStyle: {
    resizeMode: 'cover',
    height: '100%',
  },
  input: {
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    textAlign: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#3299cc',
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
    width: 200,
    alignSelf: 'center',
  },
  textoBotao: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Login;
