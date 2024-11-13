import React, { useState } from 'react';
import { FlatList, Text, View, TextInput } from 'react-native';
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
  const [searchText, setSearchText] = useState('');

  // Filtra as classes pelo texto de busca no resumo
  const filteredClasses = classes.filter((classItem) =>
    classItem.resume.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <BasePage>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>
            Classes available for consultations and studies
          </Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <FlatList
            data={filteredClasses}
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
