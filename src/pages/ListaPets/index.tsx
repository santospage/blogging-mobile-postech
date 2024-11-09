import React from 'react';
import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Card from './Card';
import pets from '../../mocks/pets';

import BasePage from '../BasePage';

interface ListaPetsProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

export default function ListaPets({navigation}: ListaPetsProps) {
  return (
    <View style={styles.container}>
      <BasePage>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>
            Olá! Veja os amigos disponíveis para adoção!
          </Text>
          <FlatList
            data={pets}
            keyExtractor={item => item.nome}
            renderItem={({item}) => <Card {...item} navigation={navigation} />}
          />
        </View>
      </BasePage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  contentContainer: {
    gap: 32,
    paddingTop: 160,
    zIndex: 1,
  },
  text: {
    color: '#3772FF',
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    fontWeight: '400',
    marginHorizontal: 67,
  },
});
