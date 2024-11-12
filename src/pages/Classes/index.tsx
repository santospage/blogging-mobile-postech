import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Card } from './Card';

import BasePage from '../BasePage';
import classes from '../../mocks/classes';
import { styles } from './styles';

interface ListaPetsProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

export default function ListaPets({ navigation }: ListaPetsProps) {
  return (
    <View style={styles.container}>
      <BasePage>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>
            Classes available for consultations and studies
          </Text>
          <FlatList
            data={classes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card {...item} navigation={navigation} />
            )}
          />
        </View>
      </BasePage>
    </View>
  );
}
