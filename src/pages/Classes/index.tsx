import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, TextInput, Alert } from 'react-native';

import { Card } from './Card';
import BasePage from '../BasePage';
import { styles } from './styles';
import { ClassRoomModel } from '../../interfaces/Classes/Classes';
import { classroomService } from '../../services/Classes/ClassRoomService';

export default function ListClasses({ navigation }: any) {
  const [searchText, setSearchText] = useState('');
  const [classes, setClasses] = useState<ClassRoomModel[]>([]);

  useEffect(() => {
    const subscription = classroomService.getClasses().subscribe({
      next: (data) => setClasses(data),
      error: (error) => {
        Alert.alert('Alert', error);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  // Filter classes
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
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Card {...item} navigation={navigation} />
            )}
          />
        </View>
      </BasePage>
    </View>
  );
}
