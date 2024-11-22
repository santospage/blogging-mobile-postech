import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, TextInput, Alert } from 'react-native';

import { Card } from './Card';
import BasePage from '../BasePage';
import { styles } from './styles';
import { ClassRoomModel } from '../../interfaces/Classes/Classes';
import { classroomService } from '../../services/Classes/ClassRoomService';

import { NavigationProp, useNavigation } from '@react-navigation/native';

export default function ListClasses() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<NavigationProp<any>>();
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
    classItem.resume.toLowerCase().includes(searchText.toLowerCase()),
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
            keyExtractor={(item) => item._id!}
            renderItem={({ item }) => (
              <Card {...item} navigation={navigation} />
            )}
          />
        </View>
      </BasePage>
    </View>
  );
}
